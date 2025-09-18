import React, { useState } from 'react';
import { User, Building, Shield, Droplets, Eye, EyeOff } from 'lucide-react';
import '../styles/login.css';

export default function WaterQualityLogin() {
  const [accessType, setAccessType] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const accessTypes = [
    {
      id: 'citizen',
      label: 'Citizen',
      icon: User,
      description: 'Access water quality data in your area',
    },
    {
      id: 'ngo',
      label: 'NGO',
      icon: Building,
      description: 'Advocate for water quality improvements',
    },
    {
      id: 'government',
      label: 'Government Official',
      icon: Shield,
      description: 'Monitor and manage water quality systems',
    }
  ];

  const handleLogin = (e) => {
    if (e) e.preventDefault();
    if (!accessType || !username || !password) {
      alert('Please fill in all fields and select an access type');
      return;
    }
    
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      alert(`Login successful as ${accessType}!`);
    }, 1500);
  };

  const resetForm = () => {
    setAccessType('');
    setUsername('');
    setPassword('');
    setShowPassword(false);
  };

  return (
    <div className="login-container">
      {/* Background Animation */}
      <div className="background-animation"></div>

      <div className="login-box">
        {/* Header */}
        <div className="header">
          <div className="logo">
            <Droplets className="logo-icon" />
          </div>
          <h1>Water Quality Monitor</h1>
          <p>Choose your access level to continue</p>
        </div>

        {!accessType ? (
          /* Access Type Selection */
          <div className="access-types">
            <h2>Select Access Type</h2>
            {accessTypes.map((type) => {
              const IconComponent = type.icon;
              return (
                <button
                  key={type.id}
                  onClick={() => setAccessType(type.id)}
                  className="access-btn"
                >
                  <div className="icon-box">
                    <IconComponent className="icon" />
                  </div>
                  <div className="text-box">
                    <h3>{type.label}</h3>
                    <p>{type.description}</p>
                  </div>
                </button>
              );
            })}
          </div>
        ) : (
          /* Login Form */
          <div className="login-form">
            <div className="login-header">
              {(() => {
                const selectedType = accessTypes.find(type => type.id === accessType);
                const IconComponent = selectedType.icon;
                return (
                  <>
                    <div className="icon-box">
                      <IconComponent className="icon" />
                    </div>
                    <span>{selectedType.label} Login</span>
                  </>
                );
              })()}
              <button onClick={resetForm} className="change-btn">
                Change Access Type
              </button>
            </div>

            <div className="input-group">
              <label>Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
              />
            </div>

            <div className="input-group">
              <label>Password</label>
              <div className="password-wrapper">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                />
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="eye-btn"
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>
            </div>

            <button
              onClick={handleLogin}
              disabled={isLoading}
              className="sign-in-btn"
            >
              {isLoading ? (
                <div className="loading">
                  <div className="spinner"></div>
                  <span>Signing In...</span>
                </div>
              ) : (
                'Sign In'
              )}
            </button>

            <div className="forgot">
              <a href="#">Forgot your password?</a>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="footer">
        <p>© 2024 Water Quality Monitoring Platform</p>
      </div>
    </div>
  );
}
