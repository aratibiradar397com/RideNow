import { useState } from 'react';
import { ArrowLeft, Bike, Eye, EyeOff, LockKeyhole, Mail, ShieldCheck, UserRound } from 'lucide-react';

export default function AuthPage({ mode, onBack, bookingIntent = false, onDemoAuthenticated }) {
  const isSignUp = mode === 'sign-up';
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');
  const [formError, setFormError] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    setFormError('');

    const formData = new FormData(event.currentTarget);
    if (isSignUp && formData.get('password') !== formData.get('confirmPassword')) {
      setFormError('Your passwords don’t match. Please check and try again.');
      return;
    }

    if (bookingIntent) {
      try {
        onDemoAuthenticated({
          name: isSignUp ? String(formData.get('name') ?? '') : '',
          email: String(formData.get('email') ?? ''),
          phone: isSignUp ? String(formData.get('phone') ?? '') : ''
        });
      } catch (error) {
        setFormError(error instanceof Error ? error.message : 'The booking draft could not be restored. Please start again.');
      }
      return;
    }

    setMessage(isSignUp
      ? 'This is a frontend demo. No account was created, and your details were not sent or saved.'
      : 'Sign-in is not connected in this demo. Your credentials were not sent or saved.');
  }

  return (
    <section className="auth-page">
      <div className="auth-shell">
        <button className="page-back-arrow auth-back-arrow" type="button" onClick={onBack} aria-label="Go back">
          <ArrowLeft size={18} />
        </button>
        <aside className="auth-promo">
          <a className="brand auth-brand" href="#home" aria-label="RideNow home">
            <Bike size={29} strokeWidth={2.5} />
            <span>Ride<span className="brand-accent">Now</span></span>
          </a>
          <div className="auth-promo-copy">
            <span className="auth-promo-icon"><ShieldCheck size={23} /></span>
            <p className="auth-eyebrow">YOUR NEXT RIDE STARTS HERE</p>
            <h1>{isSignUp ? 'Make room for more adventures.' : 'Good to see you again.'}</h1>
            <p>Explore bikes and scooters for the ride you have in mind. Account access will be enabled when RideNow’s secure backend is ready.</p>
          </div>
          <p className="auth-promo-footnote">A RideNow frontend preview · account services are not connected</p>
        </aside>

        <div className="auth-form-side">
          <div className="auth-form-wrap">
            <p className="auth-eyebrow">{isSignUp ? 'JOIN RIDENOW' : 'WELCOME BACK'}</p>
            <h2>{isSignUp ? 'Create your account' : 'Sign in to RideNow'}</h2>
            <p className="auth-form-intro">{bookingIntent
              ? 'Continue with this demo sign-in to keep your selected vehicle and rental dates.'
              : isSignUp ? 'A few details to get your rider profile started.' : 'Enter your email and password to continue.'}</p>

            <form className="auth-form" onSubmit={handleSubmit}>
              {isSignUp && (
                <>
                  <label htmlFor="full-name">Full name</label>
                  <div className="auth-input-wrap">
                    <UserRound size={17} />
                    <input id="full-name" name="name" type="text" autoComplete="name" placeholder="Enter your full name" minLength={2} required />
                  </div>

                  <label htmlFor="phone">Mobile number</label>
                  <div className="auth-input-wrap">
                    <span className="phone-prefix">+91</span>
                    <input id="phone" name="phone" type="tel" autoComplete="tel-national" placeholder="10-digit mobile number" pattern="[0-9]{10}" title="Enter a 10-digit mobile number" required />
                  </div>
                </>
              )}

              <label htmlFor="email">Email address</label>
              <div className="auth-input-wrap">
                <Mail size={17} />
                <input id="email" name="email" type="email" autoComplete="email" placeholder="you@example.com" required />
              </div>

              <label htmlFor="password">Password</label>
              <div className="auth-input-wrap">
                <LockKeyhole size={17} />
                <input id="password" name="password" type={showPassword ? 'text' : 'password'} autoComplete={isSignUp ? 'new-password' : 'current-password'} placeholder={isSignUp ? 'At least 8 characters' : 'Enter your password'} minLength={8} required />
                <button className="password-visibility" type="button" onClick={() => setShowPassword(show => !show)} aria-label={showPassword ? 'Hide password' : 'Show password'}>
                  {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>

              {isSignUp && (
                <>
                  <label htmlFor="confirm-password">Confirm password</label>
                  <div className="auth-input-wrap">
                    <LockKeyhole size={17} />
                    <input id="confirm-password" name="confirmPassword" type={showPassword ? 'text' : 'password'} autoComplete="new-password" placeholder="Re-enter your password" minLength={8} required />
                  </div>
                  <label className="auth-checkbox">
                    <input type="checkbox" name="terms" required />
                    <span>I agree to the rental terms and privacy policy when they are published.</span>
                  </label>
                </>
              )}

              {!isSignUp && (
                <div className="auth-form-options">
                  <button
                    className="auth-muted-link"
                    type="button"
                    onClick={() => setMessage('Password reset will be available after RideNow account services are connected.')}
                  >
                    Forgot password?
                  </button>
                </div>
              )}

              {formError && <p className="auth-form-error" role="alert">{formError}</p>}
              {message && <p className="auth-form-message" role="status">{message}</p>}

              <button className="button button-primary auth-submit" type="submit">
                {bookingIntent ? 'Continue to booking (demo)' : isSignUp ? 'Create account' : 'Sign in'}
              </button>
            </form>

            <p className="auth-switch">
              {isSignUp ? 'Already have an account?' : 'New to RideNow?'}{' '}
              <a href={isSignUp ? '#/sign-in' : '#/sign-up'}>{isSignUp ? 'Sign in' : 'Create an account'}</a>
            </p>
            <p className="auth-demo-note">{bookingIntent
              ? 'Demo only: no account is created, and your password is not saved or sent.'
              : 'Demo only: forms are validated in your browser and are not connected to an account service.'}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
