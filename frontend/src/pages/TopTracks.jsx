import React, { useState, useEffect } from 'react';

const TopTracks = () => {
    const [topTracks, setTopTracks] = useState([]);
    const [topArtists, setTopArtists] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8000/top-tracks');
                const data = await response.json();
                setTopTracks(data.top_tracks);
                setTopArtists(data.top_artists);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);
    return (
        <>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error.message}</p>}
            <div>
                <h1>Top Tracks</h1>
                <ul>
                    {topTracks.map((track) => (
                        <li key={track}>
                            {track}
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <h1>Top Artists</h1>
                <ul>
                    {topArtists.map((artist) => (
                        <li key={artist}>
                            {artist}
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
};

export default TopTracks;