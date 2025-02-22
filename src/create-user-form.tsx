import type { CSSProperties, Dispatch, SetStateAction, FormEvent } from 'react';
import { useState } from 'react';

interface CreateUserFormProps {
  setUserWasCreated: Dispatch<SetStateAction<boolean>>;
}

function CreateUserForm({ setUserWasCreated }: CreateUserFormProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ username?: string; password?: string[] }>({});

  const validatePassword = (password: string): string[] => {
    const errors: string[] = [];
    if (password.length < 10) errors.push('Password must be at least 10 characters long');
    if (password.length > 24) errors.push('Password must be at most 24 characters long');
    if (password.includes(' ')) errors.push('Password cannot contain spaces');
    if (!/[0-9]/.test(password)) errors.push('Password must contain at least one number');
    if (!/[A-Z]/.test(password)) errors.push('Password must contain at least one uppercase letter');
    if (!/[a-z]/.test(password)) errors.push('Password must contain at least one lowercase letter');
    return errors;
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const newErrors: { username?: string; password?: string[] } = {};
    
    if (!username.trim()) {
      newErrors.username = 'Username is required';
    }
    
    const passwordErrors = validatePassword(password);
    if (passwordErrors.length > 0) {
      newErrors.password = passwordErrors;
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setUserWasCreated(true);
  };

  return (
    <div style={formWrapper}>
      <form style={form} onSubmit={handleSubmit}>
        <label style={formLabel} htmlFor="username">Username</label>
        <input
          style={formInput}
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          aria-invalid={errors.username ? 'true' : 'false'}
        />
        {errors.username && <span style={errorText}>{errors.username}</span>}

        <label style={formLabel} htmlFor="password">Password</label>
        <input
          style={formInput}
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          aria-invalid={errors.password ? 'true' : 'false'}
        />
        {errors.password && (
          <ul style={errorList}>
            {errors.password.map((err, index) => (
              <li key={index} style={errorText}>{err}</li>
            ))}
          </ul>
        )}

        <button style={formButton} type="submit">Create User</button>
      </form>
    </div>
  );
}

export { CreateUserForm };

const formWrapper: CSSProperties = {
  maxWidth: '500px',
  width: '80%',
  backgroundColor: '#efeef5',
  padding: '24px',
  borderRadius: '8px',
};

const form: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
};

const formLabel: CSSProperties = {
  fontWeight: 700,
};

const formInput: CSSProperties = {
  outline: 'none',
  padding: '8px 16px',
  height: '40px',
  fontSize: '14px',
  backgroundColor: '#f8f7fa',
  border: '1px solid rgba(0, 0, 0, 0.12)',
  borderRadius: '4px',
};

const formButton: CSSProperties = {
  outline: 'none',
  borderRadius: '4px',
  border: '1px solid rgba(0, 0, 0, 0.12)',
  backgroundColor: '#7135d2',
  color: 'white',
  fontSize: '16px',
  fontWeight: 500,
  height: '40px',
  padding: '0 8px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: '8px',
  alignSelf: 'flex-end',
  cursor: 'pointer',
};

const errorText: CSSProperties = {
  color: 'red',
  fontSize: '12px',
  marginTop: '-4px',
};

const errorList: CSSProperties = {
  color: 'red',
  fontSize: '12px',
  paddingLeft: '16px',
};
