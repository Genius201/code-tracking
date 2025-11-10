// Test Firebase feedback functionality
import { apiService } from './src/services/hybridApi.js';

const testFeedbackIntegration = async () => {
  console.log('🧪 Testing Firebase Feedback Integration...\n');

  try {
    // Test connection status
    console.log('1️⃣ Checking connection status...');
    const status = await apiService.getConnectionStatus();
    console.log(`   Status: ${status.mode} mode - ${status.message}`);

    if (status.cloud) {
      console.log('✅ Cloud database is available!\n');

      // Test submitting feedback
      console.log('2️⃣ Testing feedback submission...');
      const testFeedback = {
        feedback: 'Test feedback from Firebase integration test',
        rating: 5,
        category: 'feature',
        user: 'Test User',
        userId: 'test-user-123'
      };

      const result = await apiService.feedback.submit(testFeedback);
      console.log('✅ Feedback submitted successfully!');
      console.log('   Result:', result);

      // Test retrieving feedback
      console.log('\n3️⃣ Testing feedback retrieval...');
      const allFeedback = await apiService.feedback.getAll();
      console.log(`✅ Retrieved ${allFeedback.length} feedback entries`);
      
      if (allFeedback.length > 0) {
        console.log('   Latest feedback:', {
          feedback: allFeedback[0].feedback,
          rating: allFeedback[0].rating,
          user: allFeedback[0].user,
          timestamp: allFeedback[0].timestamp
        });
      }

      console.log('\n🎉 Firebase feedback integration is working perfectly!');
      console.log('\n📋 What you can do now:');
      console.log('1. Open your app at http://localhost:3001');
      console.log('2. Click the feedback button to test live');
      console.log('3. Check Firebase Console to see real-time data');
      console.log('4. View feedback in your admin dashboard');
      
... (truncated for brevity)