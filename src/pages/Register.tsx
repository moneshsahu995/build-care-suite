import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { RoleSelector } from '@/components/auth/RoleSelector';
import { UserRole } from '@/types/auth';
import { Building2, Mail, Lock, User, AlertCircle, Briefcase, Award } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

export default function Register() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [step, setStep] = useState<'role' | 'details'>('role');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    organizationName: '',
    organizationId: '',
    // Role-specific fields
    yearsOfExperience: '',
    specializations: '',
    certifications: '',
    portfolioWebsite: '',
    companyName: '',
    businessType: '',
    gstNumber: '',
    businessAddress: '',
    skills: '',
    availability: '',
    qualifications: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    setStep('details');
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (selectedRole === 'organization_admin' && 'facility_manager' && !formData.organizationName.trim()) {
      newErrors.organizationName = 'Organization name is required for Organization Admin';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm() || !selectedRole) {
      return;
    }

    setIsLoading(true);

    const profile: Record<string, any> = {};

    // Add role-specific profile data
    if (selectedRole === 'facility_manager') {
      if (formData.yearsOfExperience) profile.yearsOfExperience = parseInt(formData.yearsOfExperience);
      if (formData.specializations) profile.specializations = formData.specializations.split(',').map(s => s.trim());
    } else if (selectedRole === 'green_building_consultant') {
      if (formData.certifications) profile.certifications = formData.certifications.split(',').map(s => s.trim());
      if (formData.yearsOfExperience) profile.yearsOfExperience = parseInt(formData.yearsOfExperience);
    } else if (selectedRole === 'interior_designer') {
      if (formData.portfolioWebsite) profile.portfolioWebsite = formData.portfolioWebsite;
      if (formData.yearsOfExperience) profile.yearsOfExperience = parseInt(formData.yearsOfExperience);
      if (formData.specializations) profile.specializations = formData.specializations.split(',').map(s => s.trim());
    } else if (selectedRole === 'vendor') {
      if (formData.companyName) profile.companyName = formData.companyName;
      if (formData.businessType) profile.businessType = formData.businessType;
      if (formData.gstNumber) profile.gstNumber = formData.gstNumber;
      if (formData.businessAddress) profile.businessAddress = formData.businessAddress;
    } else if (selectedRole === 'finance_manager') {
      if (formData.yearsOfExperience) profile.yearsOfExperience = parseInt(formData.yearsOfExperience);
      if (formData.qualifications) profile.qualifications = formData.qualifications;
    } else if (selectedRole === 'field_technician') {
      if (formData.skills) profile.skills = formData.skills.split(',').map(s => s.trim());
      if (formData.yearsOfExperience) profile.yearsOfExperience = parseInt(formData.yearsOfExperience);
      if (formData.availability) profile.availability = formData.availability;
    }

    const requestData = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      role: selectedRole,
      organizationName: formData.organizationName || undefined,
      organizationId: formData.organizationId || undefined,
      profile: Object.keys(profile).length > 0 ? profile : undefined,
    };

    try {
      const response = await fetch('http://localhost:3000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      const data = await response.json();

      if (data.success) {
        login(data.data.token, data.data.user);
        localStorage.setItem('refreshToken', data.data.refreshToken);
        toast({
          title: 'Registration successful',
          description: `Welcome, ${data.data.user.name}!`,
        });
        navigate('/dashboard');
      } else {
        toast({
          title: 'Registration failed',
          description: data.message || 'Unable to create account',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Unable to connect to the server. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const renderRoleSpecificFields = () => {
    if (!selectedRole) return null;

    switch (selectedRole) {
      case 'organization_admin':
        return (
          <div className="form-group">
            <label htmlFor="organizationName" className="form-label">
              Organization Name *
            </label>
            <input
              id="organizationName"
              type="text"
              className={`form-input ${errors.organizationName ? 'border-destructive' : ''}`}
              placeholder="Enter your organization name"
              value={formData.organizationName}
              onChange={(e) => setFormData({ ...formData, organizationName: e.target.value })}
            />
            {errors.organizationName && (
              <div className="form-error flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                {errors.organizationName}
              </div>
            )}
          </div>
        );

      case 'facility_manager':
        return (
          <>
            <div className="form-group">
              <label htmlFor="yearsOfExperience" className="form-label">
                Years of Experience
              </label>
              <input
                id="yearsOfExperience"
                type="number"
                className="form-input"
                placeholder="5"
                value={formData.yearsOfExperience}
                onChange={(e) => setFormData({ ...formData, yearsOfExperience: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label htmlFor="specializations" className="form-label">
                Specializations (comma-separated)
              </label>
              <input
                id="specializations"
                type="text"
                className="form-input"
                placeholder="Electrical, HVAC, Plumbing"
                value={formData.specializations}
                onChange={(e) => setFormData({ ...formData, specializations: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label htmlFor="organizationName" className="form-label">
                Organization Name *
              </label>
              <input
                id="organizationName"
                type="text"
                className={`form-input ${errors.organizationName ? 'border-destructive' : ''}`}
                placeholder="Enter your organization name"
                value={formData.organizationName}
                onChange={(e) => setFormData({ ...formData, organizationName: e.target.value })}
              />
              {errors.organizationName && (
                <div className="form-error flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  {errors.organizationName}
                </div>
              )}
            </div>
          </>
        );

      case 'green_building_consultant':
        return (
          <>
            <div className="form-group">
              <label htmlFor="certifications" className="form-label">
                Certifications (comma-separated)
              </label>
              <input
                id="certifications"
                type="text"
                className="form-input"
                placeholder="IGBC, LEED, GRIHA, BEE"
                value={formData.certifications}
                onChange={(e) => setFormData({ ...formData, certifications: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label htmlFor="yearsOfExperience" className="form-label">
                Years of Experience
              </label>
              <input
                id="yearsOfExperience"
                type="number"
                className="form-input"
                placeholder="5"
                value={formData.yearsOfExperience}
                onChange={(e) => setFormData({ ...formData, yearsOfExperience: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label htmlFor="organizationName" className="form-label">
                Organization Name *
              </label>
              <input
                id="organizationName"
                type="text"
                className={`form-input ${errors.organizationName ? 'border-destructive' : ''}`}
                placeholder="Enter your organization name"
                value={formData.organizationName}
                onChange={(e) => setFormData({ ...formData, organizationName: e.target.value })}
              />
              {errors.organizationName && (
                <div className="form-error flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  {errors.organizationName}
                </div>
              )}
            </div>
          </>
        );

      case 'interior_designer':
        return (
          <>
            <div className="form-group">
              <label htmlFor="portfolioWebsite" className="form-label">
                Portfolio Website
              </label>
              <input
                id="portfolioWebsite"
                type="url"
                className="form-input"
                placeholder="https://yourportfolio.com"
                value={formData.portfolioWebsite}
                onChange={(e) => setFormData({ ...formData, portfolioWebsite: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label htmlFor="yearsOfExperience" className="form-label">
                Years of Experience
              </label>
              <input
                id="yearsOfExperience"
                type="number"
                className="form-input"
                placeholder="5"
                value={formData.yearsOfExperience}
                onChange={(e) => setFormData({ ...formData, yearsOfExperience: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label htmlFor="organizationName" className="form-label">
                Organization Name *
              </label>
              <input
                id="organizationName"
                type="text"
                className={`form-input ${errors.organizationName ? 'border-destructive' : ''}`}
                placeholder="Enter your organization name"
                value={formData.organizationName}
                onChange={(e) => setFormData({ ...formData, organizationName: e.target.value })}
              />
              {errors.organizationName && (
                <div className="form-error flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  {errors.organizationName}
                </div>
              )}
            </div>
          </>
        );

      case 'vendor':
        return (
          <>
            <div className="form-group">
              <label htmlFor="companyName" className="form-label">
                Company Name
              </label>
              <input
                id="companyName"
                type="text"
                className="form-input"
                placeholder="Your Company"
                value={formData.companyName}
                onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label htmlFor="businessType" className="form-label">
                Business Type
              </label>
              <input
                id="businessType"
                type="text"
                className="form-input"
                placeholder="Manufacturer, Distributor, etc."
                value={formData.businessType}
                onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label htmlFor="gstNumber" className="form-label">
                GST Number
              </label>
              <input
                id="gstNumber"
                type="text"
                className="form-input"
                placeholder="GST Number"
                value={formData.gstNumber}
                onChange={(e) => setFormData({ ...formData, gstNumber: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label htmlFor="organizationName" className="form-label">
                Organization Name *
              </label>
              <input
                id="organizationName"
                type="text"
                className={`form-input ${errors.organizationName ? 'border-destructive' : ''}`}
                placeholder="Enter your organization name"
                value={formData.organizationName}
                onChange={(e) => setFormData({ ...formData, organizationName: e.target.value })}
              />
              {errors.organizationName && (
                <div className="form-error flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  {errors.organizationName}
                </div>
              )}
            </div>
          </>
        );

      case 'field_technician':
        return (
          <>
            <div className="form-group">
              <label htmlFor="skills" className="form-label">
                Skills (comma-separated)
              </label>
              <input
                id="skills"
                type="text"
                className="form-input"
                placeholder="Electrical, Plumbing, HVAC"
                value={formData.skills}
                onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label htmlFor="yearsOfExperience" className="form-label">
                Years of Experience
              </label>
              <input
                id="yearsOfExperience"
                type="number"
                className="form-input"
                placeholder="5"
                value={formData.yearsOfExperience}
                onChange={(e) => setFormData({ ...formData, yearsOfExperience: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label htmlFor="organizationName" className="form-label">
                Organization Name *
              </label>
              <input
                id="organizationName"
                type="text"
                className={`form-input ${errors.organizationName ? 'border-destructive' : ''}`}
                placeholder="Enter your organization name"
                value={formData.organizationName}
                onChange={(e) => setFormData({ ...formData, organizationName: e.target.value })}
              />
              {errors.organizationName && (
                <div className="form-error flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  {errors.organizationName}
                </div>
              )}
            </div>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div className="auth-container">
      <div className={`auth-card ${step === 'role' ? 'max-w-2xl' : ''}`}>
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
            <Building2 className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Create Account</h1>
          <p className="text-muted-foreground">
            {step === 'role' ? 'Choose your role to get started' : 'Fill in your details'}
          </p>
        </div>

        {step === 'role' ? (
          <RoleSelector selectedRole={selectedRole} onSelectRole={handleRoleSelect} />
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="form-group">
              <label htmlFor="name" className="form-label">
                Full Name *
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  id="name"
                  type="text"
                  className={`form-input pl-10 ${errors.name ? 'border-destructive' : ''}`}
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              {errors.name && (
                <div className="form-error flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  {errors.name}
                </div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email Address *
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  id="email"
                  type="email"
                  className={`form-input pl-10 ${errors.email ? 'border-destructive' : ''}`}
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              {errors.email && (
                <div className="form-error flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  {errors.email}
                </div>
              )}
            </div>

            {renderRoleSpecificFields()}

            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Password *
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  id="password"
                  type="password"
                  className={`form-input pl-10 ${errors.password ? 'border-destructive' : ''}`}
                  placeholder="Minimum 6 characters"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
              </div>
              {errors.password && (
                <div className="form-error flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  {errors.password}
                </div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword" className="form-label">
                Confirm Password *
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  id="confirmPassword"
                  type="password"
                  className={`form-input pl-10 ${errors.confirmPassword ? 'border-destructive' : ''}`}
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                />
              </div>
              {errors.confirmPassword && (
                <div className="form-error flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  {errors.confirmPassword}
                </div>
              )}
            </div>

            <div className="flex gap-3">
              <Button type="button" variant="outline" className="flex-1" onClick={() => setStep('role')}>
                Back
              </Button>
              <Button type="submit" className="flex-1" disabled={isLoading}>
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </Button>
            </div>
          </form>
        )}

        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground">
            Already have an account?{' '}
            <Link to="/login" className="text-primary font-medium hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
