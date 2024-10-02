import React, { useState, useRef } from 'react';

const Settings = () => {
  const [activeTab, setActiveTab] = useState(null);
  const appNameRef = useRef(null);
  const companyNameRef = useRef(null);
  const companyEmailRef = useRef(null);
  const companyPhoneRef = useRef(null);
  const workingDaysRef = useRef(null);
  const workingHoursRef = useRef(null);
  const addressRef = useRef(null);
  const appLogoRef = useRef(null);
  const faviconRef = useRef(null);
  const taskStatusRef = useRef(null);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleSave = () => {
    const settingsData = {
      appName: appNameRef.current.value,
      companyName: companyNameRef.current.value,
      companyEmail: companyEmailRef.current.value,
      companyPhone: companyPhoneRef.current.value,
      workingDays: workingDaysRef.current.value,
      workingHours: workingHoursRef.current.value,
      address: addressRef.current.value,
      appLogo: appLogoRef.current.value,
      favicon: faviconRef.current.value,
      taskStatus: taskStatusRef.current.value,
    };
    console.log("Saved Data:", settingsData);
    setActiveTab(null); // Close popup on save
  };

  const handleCancel = () => {
    setActiveTab(null); // Close popup on cancel
  };

  return (
    <div className="settings-container">
      <div className="button-group">
        <button onClick={() => handleTabClick('General')}>General</button>
        <button onClick={() => handleTabClick('Invoice Template')}>Invoice Template</button>
        <button onClick={() => handleTabClick('Google Recaptcha')}>Google Recaptcha</button>
      </div>

      {activeTab === 'General' && (
        <div className="popup">
          <div className="popup-content">
            <h2>General Settings</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label>App Name:</label>
                <input type="text" ref={appNameRef} placeholder="InfyProject" />
              </div>
              <div>
                <label>Company Name:</label>
                <input type="text" ref={companyNameRef} placeholder="InfyOmLabs" />
              </div>
              <div>
                <label>Company Email:</label>
                <input type="email" ref={companyEmailRef} placeholder="labs@infyom.in" />
              </div>
              <div>
                <label>Company Phone:</label>
                <input type="text" ref={companyPhoneRef} placeholder="26878307170" />
              </div>
              <div>
                <label>Working Days of Month:</label>
                <input type="number" ref={workingDaysRef} placeholder="30" />
              </div>
              <div>
                <label>Working Hours of Day:</label>
                <input type="number" ref={workingHoursRef} placeholder="8" />
              </div>
              <div>
                <label>Address:</label>
                <input type="text" ref={addressRef} placeholder="Surat" />
              </div>
              <div>
                <label>App Logo:</label>
                <input type="file" ref={appLogoRef} />
              </div>
              <div>
                <label>Favicon:</label>
                <input type="file" ref={faviconRef} />
              </div>
              <div>
                <label>Task Status:</label>
                <input type="text" ref={taskStatusRef} />
              </div>
            </div>

            <div className="button-group mt-4">
              <button onClick={handleCancel}>Cancel</button>
              <button onClick={handleSave}>Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;
