import React from 'react';

const Row = ({ name, subjects }) => {
  return (
    <div className="row">
      <div className="name">{name}</div>
      <div className="subjects">
        {subjects.map((subject, index) => (
          <button key={index} className="subject-btn">
            {subject}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Row;

   // <div className="app">
    //   <div className="tabs">
    //     <button> L1 </button>
    //     <button> L2 </button>
    //     <button> L3 Info </button>
    //     <button> L3 Maths </button>
    //     <button> M1 Genie </button>
    //     <button> M1 Image </button>
    //     <button> M1 Maths </button>
    //     <button> M2 Genie </button>
    //     <button> M2 Image </button>
    //     <button> M2 Maths </button>
    //   </div>

    //   <div className="content">
    //     {teacherData.map((item, index) => (
    //       <Row key={index} name={item.name} subjects={item.subjects} />
    //     ))}
    //   </div>

    //   <button className="generate-btn"> Generer </button>
    // </div>
