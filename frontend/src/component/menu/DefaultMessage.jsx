import React, { useContext, useState } from "react";
import { GlobalContext } from "../../api/Context";
import Brand from "./Brand";
import Login from "../auth/Auth";
import Auth from "../auth/Auth";

const DefaultMessage = () => {
  const { start, setStart, setUserData, isAuthenticated, setIsAuthenticated } = useContext(GlobalContext);

  const handleAddSample = () => {
    setStart(!start);
  };

  return (
    <>
      <style>{`
        @keyframes float {
          0%,100%{
            transform:translateY(0px);
          }
          50%{
            transform:translateY(-10px);
          }
        }

        @keyframes fadeUp {
          from{
            opacity:0;
            transform:translateY(30px);
          }
          to{
            opacity:1;
            transform:translateY(0);
          }
        }

        @keyframes glow {
          0%,100%{
            box-shadow:0 0 0 rgba(16,185,129,0.25);
          }
          50%{
            box-shadow:0 0 30px rgba(16,185,129,.35);
          }
        }

        @keyframes pulseRing {
          0%{
            transform:scale(.95);
            opacity:.8;
          }
          70%{
            transform:scale(1.03);
            opacity:0;
          }
          100%{
            transform:scale(1.03);
            opacity:0;
          }
        }

        .fade-up{
          animation:fadeUp .8s ease both;
        }

        .floating{
          animation:float 4s ease-in-out infinite;
        }

        .glow{
          animation:glow 3s ease-in-out infinite;
        }

        .ring{
          position:absolute;
          inset:-6px;
          border-radius:18px;
          border:2px solid rgba(16,185,129,.25);
          animation:pulseRing 2s infinite;
        }
      `}</style>

      <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-white to-emerald-50">

        {/* Background Blur */}
        <div className="absolute left-10 top-20 h-56 w-56 rounded-full bg-emerald-300/20 blur-3xl" />
        <div className="absolute bottom-10 right-10 h-72 w-72 rounded-full bg-cyan-300/20 blur-3xl" />

        <div className="relative mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center px-6">

          {/* Brand */}
          <div className="fade-up">
            <Brand />
          </div>
          {/* login */}
          {!isAuthenticated ? <Auth /> :
            <>
              <div className="fade-up mt-4 w-full rounded-3xl border border-white/70 bg-white/70 p-4 text-center shadow-2xl backdrop-blur-xl">

                <div className="floating mb-6 text-6xl">
                  💰
                </div>

                <h2 className="text-4xl font-extrabold tracking-tight text-slate-800">
                  Welcome to your
                  <span className="block bg-gradient-to-r from-emerald-500 to-cyan-500 bg-clip-text text-transparent">
                    Expense Tracker
                  </span>
                </h2>

                <p className="mx-auto mt-6 max-w-xl text-base leading-8 text-slate-600">
                  Track every expense, organize your finances, and build better
                  money habits. Your journey toward smarter spending starts with
                  your very first transaction.
                </p>

                {!start && (
                  <>
                    <p className="mt-8 text-sm text-slate-500">
                      Click below to add your first expense and begin tracking.
                    </p>

                    <div className="relative mt-8 inline-block">
                      <span className="ring"></span>

                      <button
                        onClick={handleAddSample}
                        className="
                      glow
                      relative
                      rounded-2xl
                      bg-gradient-to-r
                      from-emerald-500
                      via-emerald-600
                      to-teal-600
                      px-10
                      py-4
                      text-base
                      font-semibold
                      text-white
                      shadow-xl
                      transition-all
                      duration-300
                      hover:-translate-y-1
                      hover:scale-105
                      hover:shadow-emerald-400/40
                      active:scale-95
                    "
                      >
                        🚀 Get Started
                      </button>
                    </div>
                  </>
                )}
              </div>

              {/* Footer */}
              <p className="fade-up mt-8 text-sm text-slate-400">
                Start managing your finances with confidence.
              </p>
            </>}
          {/* Welcome Card */}

        </div>
      </div>
    </>
  );
};

export default DefaultMessage;