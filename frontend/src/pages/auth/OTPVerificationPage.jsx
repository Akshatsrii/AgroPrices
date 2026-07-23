import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';
import { ShieldCheck, ArrowRight, RefreshCw, KeyRound, Sparkles } from 'lucide-react';

export function OTPVerificationPage() {
  const navigate = useNavigate();
  const { phoneInput, verifyOtp } = useAuthStore();
  const [otp, setOtp] = useState(['1', '2', '3', '4', '5', '6']);
  const [error, setError] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);

  const handleOtpChange = (index, value) => {
    if (value.length > 1) value = value[value.length - 1];
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-input-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  const handleVerify = (e) => {
    e.preventDefault();
    setError('');
    setIsVerifying(true);

    const fullCode = otp.join('');
    setTimeout(() => {
      const success = verifyOtp(fullCode);
      setIsVerifying(false);
      if (success) {
        navigate('/dashboard');
      } else {
        setError('Invalid OTP code. Try entering 123456 for demo mode.');
      }
    }, 800);
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white/90 backdrop-blur-xl border border-emerald-100 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none"></div>

      <div className="flex items-center space-x-3 mb-6">
        <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-lg shadow-emerald-600/30">
          <ShieldCheck className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900 tracking-tight">OTP Verification</h2>
          <p className="text-xs text-gray-500">Sent to {phoneInput || '+91 98765 43210'}</p>
        </div>
      </div>

      <div className="bg-emerald-50 border border-emerald-200/60 rounded-2xl p-4 mb-6 text-xs text-emerald-800 flex items-start space-x-3">
        <Sparkles className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
        <div>
          <span className="font-semibold block">Demo Verification Mode:</span>
          Enter <strong>123456</strong> or click verify to proceed to farmer dashboard.
        </div>
      </div>

      <form onSubmit={handleVerify} className="space-y-6">
        <div className="flex justify-between items-center space-x-2">
          {otp.map((digit, idx) => (
            <input
              key={idx}
              id={`otp-input-${idx}`}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleOtpChange(idx, e.target.value)}
              onKeyDown={(e) => handleKeyDown(idx, e)}
              className="w-11 h-13 text-center text-xl font-bold rounded-xl border border-gray-300 bg-white focus:border-emerald-600 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all shadow-sm"
            />
          ))}
        </div>

        {error && (
          <p className="text-xs text-red-600 font-medium bg-red-50 p-3 rounded-xl border border-red-200">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={isVerifying}
          className="w-full bg-emerald-600 hover:bg-emerald-700 active:scale-[0.99] text-white font-bold py-4 rounded-xl text-sm transition-all shadow-lg shadow-emerald-600/30 flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50"
        >
          {isVerifying ? (
            <>
              <RefreshCw className="w-5 h-5 animate-spin" />
              <span>Verifying OTP...</span>
            </>
          ) : (
            <>
              <span>Verify & Continue</span>
              <ArrowRight className="w-5 h-5" />
            </>
          )}
        </button>
      </form>

      <div className="mt-6 text-center text-xs text-gray-500">
        Didn't receive code?{' '}
        <button
          type="button"
          onClick={() => alert('OTP Resent! Use 123456 for demo.')}
          className="text-emerald-600 font-bold hover:underline"
        >
          Resend SMS
        </button>
      </div>
    </div>
  );
}
