'use client';

import { useState } from 'react';
import AnimatedSection from './AnimatedSection';
import MagneticButton from './MagneticButton';

interface FormData {
  name: string;
  email: string;
  company: string;
  projectType: string;
  budget: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  company?: string;
  projectType?: string;
  budget?: string;
  message?: string;
}

const PROJECT_TYPES = [
  { value: '', label: 'Select project type' },
  { value: 'web-app', label: 'Web Application' },
  { value: 'mobile-app', label: 'Mobile App' },
  { value: 'design-system', label: 'Design System' },
  { value: 'ecommerce', label: 'E-Commerce Platform' },
  { value: 'saas', label: 'SaaS Product' },
  { value: 'other', label: 'Other' },
];

const BUDGETS = [
  { value: '', label: 'Select budget range' },
  { value: '15-25k', label: '$15K - $25K' },
  { value: '25-50k', label: '$25K - $50K' },
  { value: '50-100k', label: '$50K - $100K' },
  { value: '100k+', label: '$100K+' },
];

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    company: '',
    projectType: '',
    budget: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email format';
    if (!formData.company.trim()) newErrors.company = 'Company is required';
    if (!formData.projectType) newErrors.projectType = 'Please select a project type';
    if (!formData.budget) newErrors.budget = 'Please select a budget range';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    else if (formData.message.trim().length < 20) newErrors.message = 'Message must be at least 20 characters';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus('submitting');

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    setStatus('success');
    setFormData({ name: '', email: '', company: '', projectType: '', budget: '', message: '' });

    setTimeout(() => setStatus('idle'), 5000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const inputClassName = `
    w-full px-0 py-3
    bg-transparent
    border-none
    border-b border-graphite
    font-body-md text-white
    placeholder-gray-500
    transition-colors duration-200
    focus:outline-none
    focus:border-b-lamp-cream
    focus:shadow-[0_4px_16px_rgba(84,179,194,0.2)]
    rounded-sm
    disabled:opacity-50
  `.trim();

  const selectClassName = `
    w-full px-0 py-3
    bg-transparent
    border-none
    border-b border-graphite
    font-body-md text-white
    transition-colors duration-200
    focus:outline-none
    focus:border-b-lamp-cream
    focus:shadow-[0_4px_16px_rgba(84,179,194,0.2)]
    appearance-none
    cursor-pointer
    disabled:opacity-50
  `.trim();

  const textareaClassName = `
    w-full px-0 py-3
    bg-transparent
    border-none
    border-b border-graphite
    font-body-md text-white
    placeholder-gray-500
    transition-colors duration-200
    focus:outline-none
    focus:border-b-lamp-cream
    focus:shadow-[0_4px_16px_rgba(84,179,194,0.2)]
    resize-none rounded-sm
    disabled:opacity-50
  `.trim();

  const labelClassName = `
    block font-label-md text-gray-300 mb-2
  `.trim();

  const errorClassName = 'mt-1 text-xs text-red-400';

  return (
    <section id="contact" className="relative py-32 px-6 bg-[var(--color-bg-tertiary)] border-t border-gray-800">
      <div className="max-w-3xl mx-auto">
        <AnimatedSection className="mb-16 text-center" delay={0.1}>
          <h2 className="font-display-lg text-white mb-4">
            Let's Build Something Exceptional
          </h2>
          <p className="font-body-md text-gray-300 max-w-2xl mx-auto">
            Tell us about your project. We'll respond within 24 hours with initial thoughts.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          {status === 'success' ? (
            <div className="py-16 text-center border border-graphite">
              <div className="w-12 h-12 mx-auto mb-6 rounded-full bg-lamp-cream/10 flex items-center justify-center border border-lamp-cream/30">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-lamp-cream ml-1">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <h3 className="font-display-lg text-white mb-4">Message Sent</h3>
              <p className="font-body-md text-gray-300 mb-8">Thanks for reaching out. We'll be in touch within 24 hours.</p>
              <MagneticButton
                onClick={() => setStatus('idle')}
                variant="ghost"
                className="inline-flex items-center gap-2"
              >
                Send Another Message
              </MagneticButton>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8" noValidate>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div>
                  <label htmlFor="name" className={labelClassName}>
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={inputClassName}
                    placeholder="John Doe"
                    disabled={status === 'submitting'}
                  />
                  {errors.name && <p className={errorClassName}>{errors.name}</p>}
                </div>

                <div>
                  <label htmlFor="email" className={labelClassName}>
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={inputClassName}
                    placeholder="ssinnovix@gmail.com"
                    disabled={status === 'submitting'}
                  />
                  {errors.email && <p className={errorClassName}>{errors.email}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div>
                  <label htmlFor="company" className={labelClassName}>
                    Company
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className={inputClassName}
                    placeholder="Acme Inc."
                    disabled={status === 'submitting'}
                  />
                  {errors.company && <p className={errorClassName}>{errors.company}</p>}
                </div>

                <div>
                  <label htmlFor="projectType" className={labelClassName}>
                    Project Type
                  </label>
                  <select
                    id="projectType"
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleChange}
                    className={selectClassName}
                    disabled={status === 'submitting'}
                    aria-describedby={errors.projectType ? 'projectType-error' : undefined}
                  >
                    {PROJECT_TYPES.map(opt => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                  {errors.projectType && <p id="projectType-error" className={errorClassName}>{errors.projectType}</p>}
                </div>
              </div>

              <div>
                <label htmlFor="budget" className={labelClassName}>
                  Budget Range
                </label>
                <select
                  id="budget"
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  className={selectClassName}
                  disabled={status === 'submitting'}
                  aria-describedby={errors.budget ? 'budget-error' : undefined}
                >
                  {BUDGETS.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
                {errors.budget && <p id="budget-error" className={errorClassName}>{errors.budget}</p>}
              </div>

              <div>
                <label htmlFor="message" className={labelClassName}>
                  Project Details
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className={textareaClassName}
                  placeholder="Describe your project, goals, timeline, and any specific requirements..."
                  disabled={status === 'submitting'}
                />
                {errors.message && <p className={errorClassName}>{errors.message}</p>}
              </div>

              <MagneticButton
                type="submit"
                variant="primary"
                className="w-full sm:w-auto"
                disabled={status === 'submitting'}
              >
                {status === 'submitting' ? (
                  <>
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Sending...
                  </>
                ) : (
                  'Start a Project'
                )}
              </MagneticButton>

              <p className="text-center font-label-md text-gray-300">
                By submitting, you agree to our{' '}
                <a href="#" className="underline hover:text-white transition-colors">Privacy Policy</a>{' '}
                and{' '}
                <a href="#" className="underline hover:text-white transition-colors">Terms of Service</a>
                .
              </p>
            </form>
          )}
        </AnimatedSection>
      </div>
    </section>
  );
}
