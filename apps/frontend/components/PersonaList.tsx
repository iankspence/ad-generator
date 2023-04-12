import React from 'react';

const personas = [
    // Add your personas here with age and interests
    {
        id: 1,
        name: 'The Stressed Professional',
        age: 30,
        interests: 'Work, Stress Relief, Health',
    },
    // ... more personas
];

const PersonaList = () => {
    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Personas</h2>
            <ul>
                {personas.map((persona) => (
                    <li key={persona.id} className="mb-4">
                        <h3 className="font-semibold">{persona.name}</h3>
                        <p>Age: {persona.age}</p>
                        <p>Interests: {persona.interests}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PersonaList;
