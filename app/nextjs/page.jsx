'use client';

import React, { useState } from 'react';
import Emoji from '../components/Emoji';

const NextJSTutorial = () => {
  const firstname = 'Bryan';

  const [lastName, setLastName] = useState('');

  //   const handleSubmit = async () => {
  //     console.log('woo hoo');
  //     const response = await fetch('api/next', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ key: 'Some Message', lastName }),
  //     });
  //     const reponseJSON = await response.json();
  //     console.log(reponseJSON);
  //   };

  return (
    <div>
      <p>This is were the page appears</p>
      <p>TailWind CSS is awesome</p>
      <p className="text-red-500">{firstname}</p>

      {/* <div className="flex flex-col space-y-4">
        <p>My last name is: {lastName}</p>
        <div>
          <input
            type="text"
            className="outline w-32 rounded-md"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <button onClick={handleSubmit}>Guardar cambios</button>
        </div>
      </div> */}

      <div>
        <Emoji />
      </div>
    </div>
  );
};

export default NextJSTutorial;
