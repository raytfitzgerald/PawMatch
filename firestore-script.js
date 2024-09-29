const admin = require('firebase-admin');
const serviceAccount = require('./private-key.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function addTestData() {
  try {
    // Add a test user
    const userRef = await db.collection('users').add({
      name: 'Test User',
      email: 'testuser@example.com',
      location: { latitude: 40.7128, longitude: -74.0060 },
      preferences: { breed: ['Golden Retriever'], size: ['Medium'], age: ['Young'] },
      bio: 'I love dogs!',
      profile_image: 'https://example.com/user.jpg'
    });
    console.log('Added user with ID: ', userRef.id);

    // Add a test shelter
    const shelterRef = await db.collection('shelters').add({
      name: 'Happy Paws Shelter',
      location: { latitude: 40.7128, longitude: -74.0060 },
      contact_details: { phone: '123-456-7890', email: 'happypaws@example.com' },
      description: 'A loving shelter for all dogs',
      operating_hours: {
        monday: { open: '9:00', close: '17:00' },
        tuesday: { open: '9:00', close: '17:00' },
        wednesday: { open: '9:00', close: '17:00' },
        thursday: { open: '9:00', close: '17:00' },
        friday: { open: '9:00', close: '17:00' },
        saturday: { open: '10:00', close: '15:00' },
        sunday: { open: 'Closed', close: 'Closed' }
      }
    });
    console.log('Added shelter with ID: ', shelterRef.id);

    // Add a test dog
    const dogRef = await db.collection('dogs').add({
      name: 'Buddy',
      breed: 'Golden Retriever',
      age: 3,
      size: 'Medium',
      personality_traits: ['Friendly', 'Energetic'],
      shelter_id: shelterRef.id,
      availability: true,
      images: ['https://example.com/dog.jpg']
    });
    console.log('Added dog with ID: ', dogRef.id);

    // Add a test match
    const matchRef = await db.collection('matches').add({
      user_id: userRef.id,
      dog_id: dogRef.id,
      status: 'pending',
      match_date: admin.firestore.Timestamp.now()
    });
    console.log('Added match with ID: ', matchRef.id);

    // Add a test message
    const messageRef = await db.collection('messages').add({
      match_id: matchRef.id,
      sender_id: userRef.id,
      recipient_id: shelterRef.id,
      content: 'Hello, I\'m interested in adopting Buddy!',
      timestamp: admin.firestore.Timestamp.now()
    });
    console.log('Added message with ID: ', messageRef.id);

    // Add a test appointment
    const appointmentRef = await db.collection('appointments').add({
      user_id: userRef.id,
      dog_id: dogRef.id,
      shelter_id: shelterRef.id,
      date: admin.firestore.Timestamp.fromDate(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)), // 7 days from now
      status: 'scheduled'
    });
    console.log('Added appointment with ID: ', appointmentRef.id);

    console.log('Test data added successfully to all collections');
  } catch (error) {
    console.error('Error adding test data: ', error);
  }
}

addTestData();
