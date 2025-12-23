import React from "react";

export default function HappyMensDay() {
  return (
    <>
      <style>{`
        .page {
          min-height: 100vh;
          background: linear-gradient(to bottom right, #0f172a, #1e1b4b, #000);
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 30px;
          position: relative;
          overflow: hidden;
        }

        .card {
          max-width: 850px;
          width: 100%;
          padding: 60px;
          background: rgba(40, 40, 70, 0.3);
          border-radius: 20px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 0 40px rgba(0,0,0,0.5);
          backdrop-filter: blur(7px);
          text-align: center;
          position: relative;
        }

        .title {
          font-size: 60px;
          font-weight: 800;
          background: linear-gradient(to right, #ffd27a, #ffffff, #78d8ff);
          -webkit-background-clip: text;
          color: transparent;
          margin-bottom: 20px;
        }

        .subtitle {
          font-size: 19px;
          color: #d8d8e5;
          max-width: 650px;
          margin: auto;
          line-height: 1.6;
        }

        .btn-group {
          margin-top: 30px;
          display: flex;
          gap: 15px;
          justify-content: center;
        }

        .btn-primary {
          padding: 12px 28px;
          background: linear-gradient(to right, #ffcc57, #ffb800);
          border: none;
          border-radius: 30px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
        }

        .btn-outline {
          padding: 12px 28px;
          border: 1px solid rgba(255,255,255,0.3);
          background: transparent;
          color: #e3e3e3;
          border-radius: 12px;
          font-size: 15px;
          cursor: pointer;
        }

        .features {
          margin-top: 40px;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 20px;
        }

        .feature-box {
          padding: 20px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 14px;
        }

        .feature-box h3 {
          color: #ffd27a;
          margin-bottom: 10px;
        }

        .feature-box p {
          color: #cfcfe1;
          font-size: 14px;
        }

        .confetti .dot {
          position: absolute;
          width: 25px;
          height: 25px;
          background: linear-gradient(135deg, #ffd27a, #ff8a00);
          border-radius: 50%;
          filter: drop-shadow(0px 5px 15px rgba(0,0,0,0.5));
          opacity: 0.9;
        }
      `}</style>

      <div className="page">
        <div className="card">
          <h1 className="title">HAPPY MEN'S DAY</h1>

          <p className="subtitle">
            To the men who show strength through kindness, courage through 
            vulnerability, and leadership through service — today we celebrate you.
            Keep inspiring and keep being the steady force that helps others rise.
          </p>

          <div className="btn-group">
            <button className="btn-primary">Send Wishes</button>
            <button className="btn-outline">Share</button>
          </div>

          <div className="features">
            <Feature
              title="Strength"
              text="Strength isn’t only muscle — it’s compassion, consistency and standing up for what’s right."
            />
            <Feature
              title="Integrity"
              text="A true man acts with honesty, keeps his promises, and owns his mistakes."
            />
            <Feature
              title="Care"
              text="Caring is a quiet power: listening, supporting, and lifting others without seeking reward."
            />
          </div>
        </div>

        <Confetti />
      </div>
    </>
  );
}

function Feature({ title, text }) {
  return (
    <div className="feature-box">
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  );
}

function Confetti() {
  const dots = [
    { left: "6%", top: "8%" },
    { left: "18%", top: "20%" },
    { left: "84%", top: "14%" },
    { left: "70%", top: "78%" },
    { left: "40%", top: "68%" },
  ];

  return (
    <div className="confetti">
      {dots.map((style, i) => (
        <span key={i} className="dot" style={style}></span>
      ))}
    </div>
  );
}
