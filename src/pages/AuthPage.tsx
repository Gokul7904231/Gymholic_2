import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Dumbbell,
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  ArrowLeft,
  Phone,
  Chrome,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const AuthPage = () => {
  const [searchParams] = useSearchParams();
  const isRegisterMode = searchParams.get('mode') === 'register';
  const [isLogin, setIsLogin] = useState(!isRegisterMode);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [role, setRole] = useState<'customer' | 'gym-owner'>('customer');

  const { login, register } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const success = isLogin
        ? await login(email, password)
        : await register(email, password, name, phoneNumber, role);

      if (!success) throw new Error();

      toast({
        title: isLogin ? 'Welcome back!' : 'Account created!',
      });

      navigate('/role-selection');
    } catch {
      toast({
        title: 'Error',
        description:
          'Please check your details or register if you do not have an account.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    toast({
      title: 'Google Sign-In',
      description: 'Google authentication not configured yet.',
    });
  };

  return (
    <div className="min-h-screen bg-background flex">
      <div className="flex-1 flex justify-center px-8 py-12">
        <div className="w-full max-w-md">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-muted-foreground mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to home
          </Link>

          <motion.div
            initial={{ opacity: 0, x: -28 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45 }}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-gym-coral flex items-center justify-center">
                <Dumbbell className="w-7 h-7 text-primary-foreground" />
              </div>
              <span className="text-3xl font-bold">Gymholic</span>
            </div>

            <h1 className="text-3xl font-bold mb-3">
              {isLogin ? 'Welcome back' : 'Create account'}
            </h1>
            <p className="text-muted-foreground mb-6">
              {isLogin
                ? "Enter your credentials to access your account."
                : "Start your fitness journey today!"}
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* FULL NAME */}
              {!isLogin && (
                <InputBlock
                  icon={<User />}
                  label="Full Name"
                  value={name}
                  onChange={setName}
                />
              )}

              {/* PHONE */}
              {!isLogin && (
                <InputBlock
                  icon={<Phone />}
                  label="Phone Number"
                  value={phoneNumber}
                  onChange={(v) =>
                    setPhoneNumber(v.replace(/\D/g, '').slice(0, 15))
                  }
                />
              )}

              {/* ROLE */}
              {!isLogin && (
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value as any)}
                  className="w-full h-12 rounded-xl border px-4"
                >
                  <option value="customer">Customer</option>
                  <option value="gym-owner">Gym Owner</option>
                </select>
              )}

              {/* EMAIL */}
              <InputBlock
                icon={<Mail />}
                label="Email"
                type="email"
                value={email}
                onChange={setEmail}
              />

              {/* PASSWORD */}
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="peer h-12 w-full rounded-xl border px-11 pr-12 pt-5"
                />
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </button>
                <FloatingLabel text="Password" />
              </div>

              <Button className="w-full h-12" disabled={loading}>
                {isLogin ? 'Login' : 'Create Account'}
              </Button>

              {isLogin && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleGoogleSignIn}
                  className="w-full h-12 flex gap-2"
                >
                  <Chrome className="w-5 h-5" />
                  Sign in with Google
                </Button>
              )}
            </form>

            {/* ↔️ SMART SWITCH BOTTOM */}
            <div className="mt-6 text-center">
              {isLogin ? (
                <p className="text-muted-foreground">
                  Don’t have an account?
                  <button
                    onClick={() => setIsLogin(false)}
                    className="text-primary font-semibold ml-2 hover:underline"
                  >
                    Register
                  </button>
                </p>
              ) : (
                <p className="text-muted-foreground">
                  Already registered?
                  <button
                    onClick={() => setIsLogin(true)}
                    className="text-primary font-semibold ml-2 hover:underline"
                  >
                    Login
                  </button>
                </p>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;

/* ---------- SAFE INLINE COMPONENTS ---------- */

const InputBlock = ({
  icon,
  label,
  type = 'text',
  value,
  onChange,
}: {
  icon: JSX.Element;
  label: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
}) => (
  <div className="relative">
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      required
      className="peer h-12 w-full rounded-xl border px-11 pt-5"
    />
    <div className="absolute left-3 top-1/2 -translate-y-1/2">
      {icon}
    </div>
    <FloatingLabel text={label} />
  </div>
);

const FloatingLabel = ({ text }: { text: string }) => (
  <label className="absolute left-11 top-1/2 -translate-y-1/2 text-sm peer-focus:-top-2 peer-focus:text-xs peer-focus:text-primary transition-all">
    {text}
  </label>
);
