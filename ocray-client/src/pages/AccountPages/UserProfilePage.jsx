import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button.jsx';
import {
  changePassword,
  fetchProfile,
  getToken,
  saveSession,
  updateProfile,
} from '../../services/api.js';

const panelClass = 'rounded-3xl border border-amber-500/30 bg-white/95 p-6 shadow-[0_18px_48px_rgba(80,60,20,0.14)]';
const inputClass = 'w-full rounded-xl border border-amber-700/25 bg-white px-4 py-3 text-sm text-zinc-900 outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-200';
const labelClass = 'mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-amber-800';

const emptyAddress = {
  recipientName: '',
  phone: '',
  line1: '',
  line2: '',
  city: '',
  province: '',
  postalCode: '',
};

export default function UserProfilePage() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [form, setForm] = useState({ firstName: '', lastName: '', address: emptyAddress });
  const [passwordForm, setPasswordForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
  const [profileStatus, setProfileStatus] = useState({ loading: true, error: '', success: '' });
  const [passwordStatus, setPasswordStatus] = useState({ loading: false, error: '', success: '' });

  useEffect(() => {
    if (!getToken()) {
      navigate('/auth/signin');
      return;
    }

    fetchProfile()
      .then(({ user }) => {
        setProfile(user);
        setForm({
          firstName: user.firstName ?? '',
          lastName: user.lastName ?? '',
          address: { ...emptyAddress, ...(user.address ?? {}) },
        });
        setProfileStatus({ loading: false, error: '', success: '' });
      })
      .catch((error) => setProfileStatus({ loading: false, error: error.message, success: '' }));
  }, [navigate]);

  const updateAddressField = (field, value) => {
    setForm((current) => ({
      ...current,
      address: { ...current.address, [field]: value },
    }));
  };

  const handleProfileUpdate = async (event) => {
    event.preventDefault();
    setProfileStatus({ loading: true, error: '', success: '' });
    try {
      const { user } = await updateProfile(form);
      setProfile(user);
      saveSession({ token: getToken(), user });
      setProfileStatus({ loading: false, error: '', success: 'Profile information updated successfully.' });
    } catch (error) {
      setProfileStatus({ loading: false, error: error.message, success: '' });
    }
  };

  const handlePasswordChange = async (event) => {
    event.preventDefault();
    setPasswordStatus({ loading: true, error: '', success: '' });

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordStatus({ loading: false, error: 'New passwords do not match.', success: '' });
      return;
    }

    try {
      const result = await changePassword({
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword,
      });
      setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setPasswordStatus({ loading: false, error: '', success: result.message });
    } catch (error) {
      setPasswordStatus({ loading: false, error: error.message, success: '' });
    }
  };

  if (profileStatus.loading && !profile) {
    return <p className="mx-auto max-w-6xl px-4 py-12 text-center font-semibold text-zinc-800">Loading profile...</p>;
  }

  return (
    <div className="mx-auto w-full max-w-6xl px-4 pb-14">
      <section className="mb-6 rounded-3xl border border-amber-500/35 bg-zinc-950 p-7 text-white shadow-xl">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-amber-400">User Profile</p>
        <h1 className="mt-3 text-4xl font-black">My Profile</h1>
        <p className="mt-2 text-sm text-zinc-300">View your account, edit your information, or change your password.</p>
      </section>

      {profileStatus.error && <p role="alert" className="mb-5 rounded-xl bg-red-100 p-4 text-sm font-semibold text-red-800">{profileStatus.error}</p>}
      {profileStatus.success && <p role="status" className="mb-5 rounded-xl bg-green-100 p-4 text-sm font-semibold text-green-800">{profileStatus.success}</p>}

      <section className="grid gap-6 lg:grid-cols-2">
        <form className={panelClass} onSubmit={handleProfileUpdate}>
          <h2 className="text-2xl font-black text-zinc-950">View and Edit Information</h2>
          <p className="mt-1 text-sm text-zinc-600">Your username and email are protected and cannot be changed here.</p>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div>
              <label className={labelClass}>Username</label>
              <input className={`${inputClass} bg-zinc-100 text-zinc-500`} value={profile?.username ?? ''} disabled />
            </div>
            <div>
              <label className={labelClass}>Email</label>
              <input className={`${inputClass} bg-zinc-100 text-zinc-500`} value={profile?.email ?? ''} disabled />
            </div>
            <div>
              <label className={labelClass}>First Name</label>
              <input className={inputClass} value={form.firstName} onChange={(event) => setForm({ ...form, firstName: event.target.value })} required />
            </div>
            <div>
              <label className={labelClass}>Last Name</label>
              <input className={inputClass} value={form.lastName} onChange={(event) => setForm({ ...form, lastName: event.target.value })} required />
            </div>
            <div className="sm:col-span-2">
              <label className={labelClass}>Recipient Name</label>
              <input className={inputClass} value={form.address.recipientName} onChange={(event) => updateAddressField('recipientName', event.target.value)} />
            </div>
            <div>
              <label className={labelClass}>Phone</label>
              <input className={inputClass} value={form.address.phone} onChange={(event) => updateAddressField('phone', event.target.value)} />
            </div>
            <div>
              <label className={labelClass}>Postal Code</label>
              <input className={inputClass} value={form.address.postalCode} onChange={(event) => updateAddressField('postalCode', event.target.value)} />
            </div>
            <div className="sm:col-span-2">
              <label className={labelClass}>Address Line 1</label>
              <input className={inputClass} value={form.address.line1} onChange={(event) => updateAddressField('line1', event.target.value)} />
            </div>
            <div className="sm:col-span-2">
              <label className={labelClass}>Address Line 2</label>
              <input className={inputClass} value={form.address.line2} onChange={(event) => updateAddressField('line2', event.target.value)} />
            </div>
            <div>
              <label className={labelClass}>City</label>
              <input className={inputClass} value={form.address.city} onChange={(event) => updateAddressField('city', event.target.value)} />
            </div>
            <div>
              <label className={labelClass}>Province</label>
              <input className={inputClass} value={form.address.province} onChange={(event) => updateAddressField('province', event.target.value)} />
            </div>
          </div>

          <Button className="mt-5" type="submit" disabled={profileStatus.loading}>Save Information</Button>
        </form>

        <form className={`${panelClass} self-start`} onSubmit={handlePasswordChange}>
          <h2 className="text-2xl font-black text-zinc-950">Change Password</h2>
          <p className="mt-1 text-sm text-zinc-600">Use at least 8 characters with a letter and a number.</p>

          {passwordStatus.error && <p role="alert" className="mt-4 rounded-xl bg-red-100 p-3 text-sm font-semibold text-red-800">{passwordStatus.error}</p>}
          {passwordStatus.success && <p role="status" className="mt-4 rounded-xl bg-green-100 p-3 text-sm font-semibold text-green-800">{passwordStatus.success}</p>}

          <div className="mt-5 space-y-4">
            <div>
              <label className={labelClass}>Current Password</label>
              <input className={inputClass} type="password" value={passwordForm.currentPassword} onChange={(event) => setPasswordForm({ ...passwordForm, currentPassword: event.target.value })} required />
            </div>
            <div>
              <label className={labelClass}>New Password</label>
              <input className={inputClass} type="password" minLength="8" value={passwordForm.newPassword} onChange={(event) => setPasswordForm({ ...passwordForm, newPassword: event.target.value })} required />
            </div>
            <div>
              <label className={labelClass}>Confirm New Password</label>
              <input className={inputClass} type="password" minLength="8" value={passwordForm.confirmPassword} onChange={(event) => setPasswordForm({ ...passwordForm, confirmPassword: event.target.value })} required />
            </div>
          </div>

          <Button className="mt-5" type="submit" disabled={passwordStatus.loading}>Change Password</Button>
        </form>
      </section>
    </div>
  );
}
