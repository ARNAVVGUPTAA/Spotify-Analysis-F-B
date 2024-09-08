import spotipy
from spotipy.oauth2 import SpotifyOAuth
from flask import (
    Flask,
    request,
    redirect,
    render_template,
    url_for,
    render_template_string,
)
from flask_cors import CORS
import numpy as np
import config
import pandas as pd
import json, os

# Set up Spotify API credentials
client_id = config.SPOTIPY_CLIENT_ID
client_secret = config.SPOTIPY_CLIENT_SECRET
redirect_uri = "http://localhost:8000/callback"

# Create Flask app
app = Flask(__name__)
CORS(app)

# Create Spotify OAuth object
sp_oauth = SpotifyOAuth(
    client_id=client_id,
    client_secret=client_secret,
    redirect_uri=redirect_uri,
    scope="user-top-read",
)

user_id = None
top_tracks = []
top_artists = []


@app.route("/")
def check_if_logged_in():
    if sp_oauth.is_token_expired(sp_oauth.get_cached_token()):
        return {"status": False}
    else:
        return {"status": True}


@app.route("/login")
def login():
    auth_url = sp_oauth.get_authorize_url()
    return {"auth_url": auth_url}


@app.route("/callback")
def callback():
    code = request.args.get("code")
    token_info = sp_oauth.get_access_token(code)
    sp = spotipy.Spotify(auth=token_info["access_token"])
    return redirect("http://localhost:5173/")

    # Create HTML output
    # html_output = "<h1>These are your top 10 songs:</h1><ul>"
    # for track in top_tracks:
    #     html_output += f"<li>{track}</li>"
    # html_output += "</ul><h1>These are your top 5 spotify artists</h1><ul>"
    # for artist in top_artists:
    #     html_output += f"<li>{artist}</li>"
    # html_output += "</ul>" + render_template("survey.html")

    # return html_output


@app.route("/top-tracks")
def get_top_tracks():
    global user_id
    global top_tracks
    global top_artists
    sp = spotipy.Spotify(auth=sp_oauth.get_cached_token()["access_token"])
    user_id = sp.current_user()["id"]
    tracks = sp.current_user_top_tracks(limit=10)
    top_tracks = []
    for idx, item in enumerate(tracks["items"]):
        track = item
        top_tracks.append(f"{idx + 1}. {track['artists'][0]['name']} - {track['name']}")
    artists = sp.current_user_top_artists(limit=5)
    top_artists = []
    for idx, item in enumerate(artists["items"]):
        artist = item
        top_artists.append(f"{idx + 1}. {artist['name']}")
    return {"top_tracks": top_tracks, "top_artists": top_artists}


@app.route("/submit", methods=["POST"])
def submit():
    responses = {
        "user": {
            "id": user_id,
            user_id: {
                "tracks": top_tracks,
                "artists": top_artists,
                "openness": [
                    request.form.get("openness1"),
                    request.form.get("openness2"),
                ],
                "conscientious": [
                    request.form.get("conscentious1"),
                    request.form.get("conscentious2"),
                ],
                "extraversion": [
                    request.form.get("extraversion1"),
                    request.form.get("extraversion2"),
                ],
                "agreeableness": [
                    request.form.get("agreeableness1"),
                    request.form.get("agreeableness2"),
                ],
                "neuroticism": [
                    request.form.get("neuroticism1"),
                    request.form.get("neuroticism2"),
                ],
                "personality": [request.form.get("personality_trait")],
            },
        }
    }

    try:
        with open("responses.json", "r") as json_file:
            existing_responses = json.load(json_file)
    except FileNotFoundError:
        # If the file doesn't exist, start with an empty list
        existing_responses = []
    except json.JSONDecodeError:
        # If the file is not a valid JSON, start with an empty list
        existing_responses = []

    # Append the new responses to the existing data
    existing_responses.append(responses)

    try:
        # Save the updated list of responses back to the JSON file
        with open("responses.json", "w") as json_file:
            json.dump(existing_responses, json_file, indent=4)
    except Exception as e:
        print(f"An error occurred while saving to JSON file: {e}")
        return "An error occurred while saving your response.", 500

    # Redirect to the thank_you page after saving the response
    return {"message": "Thank you for completing the survey!"}


if __name__ == "__main__":
    app.run(port=8000, debug=True)
# import spotipy
# from spotipy.oauth2 import SpotifyOAuth
# from flask import (
#     Flask,
#     request,
#     redirect,
#     render_template,
#     url_for,
#     render_template_string,
# )
# import numpy as np
# import backend.config as config

# # Set up Spotify API credentials
# client_id = config.SPOTIPY_CLIENT_ID
# client_secret = config.SPOTIPY_CLIENT_SECRET
# redirect_uri = "http://localhost:8000/callback"

# # Create Flask app
# app = Flask(__name__)

# # Create Spotify OAuth object
# sp_oauth = SpotifyOAuth(
#     client_id=client_id,
#     client_secret=client_secret,
#     redirect_uri=redirect_uri,
#     scope="user-top-read",
# )


# @app.route("/")
# def login():
#     auth_url = sp_oauth.get_authorize_url()
#     return redirect(auth_url)


# @app.route("/submit", methods=["POST"])
# def submit():
#     responses = {
#         "complex_lyrics": request.form.get("complex_lyrics"),
#         "unique_sounds": request.form.get("unique_sounds"),
#     }

#     # Process the responses (e.g., save to a database or file)
#     # For now, we just print them
#     print(responses)

#     # Redirect to the thank_you page
#     return redirect(url_for("thank_you"))


# @app.route("/thank_you")
# def thank_you():
#     return "Thank you for completing the survey!"


# @app.route("/callback")
# def callback():
#     code = request.args.get("code")
#     token_info = sp_oauth.get_access_token(code)
#     sp = spotipy.Spotify(auth=token_info["access_token"])
#     user_id = sp.current_user()["id"]
#     tracks = sp.current_user_top_tracks(limit=10)
#     top_tracks = []
#     for idx, item in enumerate(tracks["items"]):
#         track = item
#         top_tracks.append(f"{idx + 1}. {track['artists'][0]['name']} - {track['name']}")
#     artists = sp.current_user_top_artists(limit=5)
#     top_artists = []
#     for idx, item in enumerate(artists["items"]):
#         artist = item
#         top_artists.append(f"{idx + 1}. {artist['name']}")

#     # Create HTML output
#     html_output = "<h1>These are your top 10 songs:</h1><ul>"
#     for track in top_tracks:
#         html_output += f"<li>{track}</li>"
#     html_output += "</ul><h1>These are your top 5 spotify artists</h1><ul>"
#     for artist in top_artists:
#         html_output += f"<li>{artist}</li>"
#     html_output += "</ul>" + render_template("survey.html")

#     return html_output


# if __name__ == "__main__":
#     app.run(port=8000, debug=True)
