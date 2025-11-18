# 🔒 3uTools Certificate Installation Package
## Complete iPad Certificate Access Package for 3uTools

### 📦 Package Contents
This package contains all necessary files for installing certificates on your iPad using 3uTools, especially when activation lock prevents normal Settings access.

---

## 🚀 STEP-BY-STEP 3UTOOLS INSTALLATION GUIDE

### Prerequisites:
- ✅ Download and install 3uTools from official website: https://3u.com/
- ✅ iPad with USB cable
- ✅ Windows computer with 3uTools installed

### Method 1: Direct Certificate Transfer

#### Step 1: Connect iPad
1. Connect your iPad to computer via USB cable
2. Open 3uTools application
3. Wait for device recognition (even with activation lock)

#### Step 2: Access File System
1. In 3uTools, click **"File System"** tab
2. Navigate to **"Raw File System"**
3. Browse to: `/var/mobile/Library/Keychains/`

#### Step 3: Transfer Certificate Files
Transfer these files to iPad:
- `genes-root-certificate.pem`
- `genes-personal-certificate.pem` 
- `ipad-genes-certificate.pem`

#### Step 4: Install via Configuration Profile
1. Go to **"Applications"** tab in 3uTools
2. Click **"Install .ipa"** 
3. Select: `genes-ipad-config.mobileconfig`
4. Install the configuration profile

---

### Method 2: Configuration Profile Method

#### Step 1: Configuration Profile Transfer
1. In 3uTools **"File System"**
2. Navigate to: `/var/mobile/Library/ConfigurationProfiles/`
3. Copy these files:
   - `genes-ipad-config.mobileconfig`
   - `genes-personal-config.mobileconfig`
   - `genes-fixed-config.mobileconfig`
... (truncated for brevity)