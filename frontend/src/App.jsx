import React, { useEffect, useState } from 'react';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const redirect = async () => {
    try {
      const response = await fetch('http://localhost:8000/login');
      const data = await response.json();
      window.location.href = data.auth_url;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8000/');
        const data = await response.json();
        if (data.status === true) {
          setIsLoggedIn(true);
        }

      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      openness1: formData.get('openness1'),
      openness2: formData.get('openness2'),
      conscentious1: formData.get('conscentious1'),
      conscentious2: formData.get('conscentious2'),
      extraversion1: formData.get('extraversion1'),
      extraversion2: formData.get('extraversion2'),
      agreeableness1: formData.get('agreeableness1'),
      agreeableness2: formData.get('agreeableness2'),
      neuroticism1: formData.get('neuroticism1'),
      neuroticism2: formData.get('neuroticism2'),
      personality_trait: formData.get('personality_trait'),
    };
    try {
      const response = await fetch('http://localhost:8000/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const responseData = await response.json();
      console.log(responseData);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    isLoggedIn ?
      <div className="max-w-2xl mx-auto p-4">
        <h1 className="text-3xl font-bold text-center mb-6">Music Preference Survey</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="openness1" className="block font-semibold mb-2">
              Do you prefer songs with complex lyrics?
            </label>
            {['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'].map((option, index) => (
              <div key={index}>
                <input
                  type="radio"
                  id={`openness1_${index + 1}`}
                  name="openness1"
                  value={index + 1}
                  className="mr-2"
                />
                <label htmlFor={`openness1_${index + 1}`}>{option}</label>
              </div>
            ))}
          </div>

          <div>
            <label htmlFor="openness2" className="block font-semibold mb-2">
              Do you prefer songs with unique sounds?
            </label>
            {['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'].map((option, index) => (
              <div key={index}>
                <input
                  type="radio"
                  id={`openness2_${index + 1}`}
                  name="openness2"
                  value={index + 1}
                  className="mr-2"
                />
                <label htmlFor={`openness2_${index + 1}`}>{option}</label>
              </div>
            ))}
          </div>

          <div>
            <label htmlFor="conscentious1" className="block font-semibold mb-2">
              I prefer to listen to music that helps me stay focused and organized.
            </label>
            {['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'].map((option, index) => (
              <div key={index}>
                <input
                  type="radio"
                  id={`conscentious1_${index + 1}`}
                  name="conscentious1"
                  value={index + 1}
                  className="mr-2"
                />
                <label htmlFor={`conscentious1_${index + 1}`}>{option}</label>
              </div>
            ))}
          </div>

          <div>
            <label htmlFor="conscentious2" className="block font-semibold mb-2">
              I stick to a few favorite genres or artists rather than frequently exploring new music.
            </label>
            {['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'].map((option, index) => (
              <div key={index}>
                <input
                  type="radio"
                  id={`conscentious2_${index + 1}`}
                  name="conscentious2"
                  value={index + 1}
                  className="mr-2"
                />
                <label htmlFor={`conscentious2_${index + 1}`}>{option}</label>
              </div>
            ))}
          </div>

          <div>
            <label htmlFor="extraversion1" className="block font-semibold mb-2">
              I enjoy listening to upbeat and energetic music in social settings.
            </label>
            {['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'].map((option, index) => (
              <div key={index}>
                <input
                  type="radio"
                  id={`extraversion1_${index + 1}`}
                  name="extraversion1"
                  value={index + 1}
                  className="mr-2"
                />
                <label htmlFor={`extraversion1_${index + 1}`}>{option}</label>
              </div>
            ))}
          </div>

          <div>
            <label htmlFor="extraversion2" className="block font-semibold mb-2">
              I often share new songs or artists with friends and family.
            </label>
            {['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'].map((option, index) => (
              <div key={index}>
                <input
                  type="radio"
                  id={`extraversion2_${index + 1}`}
                  name="extraversion2"
                  value={index + 1}
                  className="mr-2"
                />
                <label htmlFor={`extraversion2_${index + 1}`}>{option}</label>
              </div>
            ))}
          </div>

          <div>
            <label htmlFor="agreeableness1" className="block font-semibold mb-2">
              I prefer music with positive and uplifting messages.
            </label>
            {['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'].map((option, index) => (
              <div key={index}>
                <input
                  type="radio"
                  id={`agreeableness1_${index + 1}`}
                  name="agreeableness1"
                  value={index + 1}
                  className="mr-2"
                />
                <label htmlFor={`agreeableness1_${index + 1}`}>{option}</label>
              </div>
            ))}
          </div>

          <div>
            <label htmlFor="agreeableness2" className="block font-semibold mb-2">
              I am drawn to songs that promote social harmony and understanding.
            </label>
            {['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'].map((option, index) => (
              <div key={index}>
                <input
                  type="radio"
                  id={`agreeableness2_${index + 1}`}
                  name="agreeableness2"
                  value={index + 1}
                  className="mr-2"
                />
                <label htmlFor={`agreeableness2_${index + 1}`}>{option}</label>
              </div>
            ))}
          </div>

          <div>
            <label htmlFor="neuroticism1" className="block font-semibold mb-2">
              I often listen to music that reflects or helps me process my emotions, especially when feeling stressed or anxious.
            </label>
            {['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'].map((option, index) => (
              <div key={index}>
                <input
                  type="radio"
                  id={`neuroticism1_${index + 1}`}
                  name="neuroticism1"
                  value={index + 1}
                  className="mr-2"
                />
                <label htmlFor={`neuroticism1_${index + 1}`}>{option}</label>
              </div>
            ))}
          </div>

          <div>
            <label htmlFor="neuroticism2" className="block font-semibold mb-2">
              I am drawn to songs with intense or melancholic themes that resonate with my mood.
            </label>
            {['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'].map((option, index) => (
              <div key={index}>
                <input
                  type="radio"
                  id={`neuroticism2_${index + 1}`}
                  name="neuroticism2"
                  value={index + 1}
                  className="mr-2"
                />
                <label htmlFor={`neuroticism2_${index + 1}`}>{option}</label>
              </div>
            ))}
          </div>

          <div>
            <label htmlFor="personality_trait" className="block font-semibold mb-2">
              What is your personality type according to the 16 Personality Types defined:
            </label>
            <select name="personality_trait" id="personality" className="block w-full p-2 border border-gray-300 rounded">
              <option value="ISTG">ISTG</option>
              <option value="ISTP">ISTP</option>
              <option value="ISFJ">ISFJ</option>
              <option value="ISFP">ISFP</option>
              <option value="INTJ">INTJ</option>
              <option value="INTP">INTP</option>
              <option value="INFJ">INFJ</option>
              <option value="INFP">INFP</option>
              <option value="ESTG">ESTG</option>
              <option value="ESTP">ESTP</option>
              <option value="ESFJ">ESFJ</option>
              <option value="ESFP">ESFP</option>
              <option value="ENTJ">ENTJ</option>
              <option value="ENTP">ENTP</option>
              <option value="ENFJ">ENFJ</option>
              <option value="ENFP">ENFP</option>
            </select>
          </div>
          <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
            Submit
          </button>
        </form>
      </div>
      :
      <div className="max-w-2xl mx-auto p-4">
        <button className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition" onClick={redirect}>
          Login
        </button>
      </div>
  );
};

export default App;