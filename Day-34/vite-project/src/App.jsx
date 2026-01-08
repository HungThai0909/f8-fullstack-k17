import React, { useState, useRef, useEffect } from "react";
import confetti from "canvas-confetti";
import { Toaster, toast } from "sonner";

function App() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);
  const correctOTP = "123456";

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (index, value) => {
    if (value && !/^\d$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }

    const fullOtp = newOtp.join("");
    if (fullOtp.length === 6) {
      validateOTP(fullOtp);
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace") {
      if (!otp[index] && index > 0) {
        inputRefs.current[index - 1].focus();
      } else {
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1].focus();
    } else if (e.key === "ArrowRight" && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").trim();

    if (/^\d{6}$/.test(pastedData)) {
      const newOtp = pastedData.split("");
      setOtp(newOtp);
      inputRefs.current[5].focus();
      validateOTP(pastedData);
    } else {
      toast.error("Dữ liệu không hợp lệ", {
        description: "Vui lòng dán mã OTP gồm 6 chữ số.",
      });
    }
  };

  const validateOTP = (otpString) => {
    setTimeout(() => {
      if (otpString === correctOTP) {
        toast.success("Xác thực thành công!", {
          description: "Mã OTP của bạn đã được xác nhận.",
          duration: 3000,
        });
        confetti({ particleCount: 120, spread: 70, origin: { y: 0.7 } });
      } else {
        toast.error("OTP không chính xác", {
          description: "Vui lòng kiểm tra và thử lại.",
          duration: 3000,
        });
        setTimeout(() => {
          setOtp(["", "", "", "", "", ""]);
          inputRefs.current[0].focus();
        }, 500);
      }
    }, 300);
  };

  const inputBaseClass =
    "text-center bg-black text-white border-2 border-gray-600 w-[80px] h-[100px] text-[50px] " +
    "transition-colors relative focus:border-gray-400 focus:z-10";

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <Toaster position="top-right" richColors />
      <div className="flex h-full">
        <div className="flex h-full">
          {otp.slice(0, 3).map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={handlePaste}
              className={`${inputBaseClass} ${
                index === 0
                  ? "rounded-tl-[10px] rounded-bl-[10px]"
                  : index === 1
                  ? "-ml-[2px]"
                  : "-ml-[2px] rounded-tr-[10px] rounded-br-[10px]"
              }`}
            />
          ))}
        </div>
        <div className="w-[60px] flex items-center justify-center mx-6">
          <span className="block w-[20px] h-[3px] rounded-full bg-[#504f4f]"></span>
        </div>
        <div className="flex h-full">
          {otp.slice(3, 6).map((digit, index) => (
            <input
              key={index + 3}
              ref={(el) => (inputRefs.current[index + 3] = el)}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) =>
                handleChange(index + 3, e.target.value)
              }
              onKeyDown={(e) =>
                handleKeyDown(index + 3, e)
              }
              onPaste={handlePaste}
              className={`${inputBaseClass} ${
                index === 0
                  ? "rounded-tl-[10px] rounded-bl-[10px]"
                  : index === 1
                  ? "-ml-[2px]"
                  : "-ml-[2px] rounded-tr-[10px] rounded-br-[10px]"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
