import { ScrollView, StyleSheet, TouchableOpacity, View, Linking, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

const STUDENT = {
  firstName: 'ปฐพล',
  lastName: 'สร้อยเสนา',
  studentId: '663450041-0',
  course: 'วิทยการคอมพิวเตอร์และสารสนเทศ',
  email: 'patapol.eing@gmail.com',
  phone: '083-534-5534',
  github: 'PATHAPHON',
  facebook: 'PATHAPHON',
};

const contactOptions = [
  { icon: 'mail-outline', label: 'Email', value: STUDENT.email, type: 'email' },
  { icon: 'logo-github', label: 'GitHub', value: STUDENT.github, type: 'github' },
  { icon: 'logo-facebook', label: 'Facebook', value: STUDENT.facebook, type: 'facebook' },
] as const;

function getInitials(first: string, last: string) {
  return `${first.charAt(0)}${last.charAt(0)}`;
}

function handleContact(type: string, value: string) {
  switch (type) {
    case 'email':
      Linking.openURL(`mailto:${value}`);
      break;
    case 'github':
      Linking.openURL(`https://github.com/${value}`);
      break;
    case 'facebook':
      Linking.openURL(`https://facebook.com/${value}`);
      break;
    default:
      Alert.alert('Error', 'Cannot open link');
  }
}

export default function ProfileScreen() {
  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Avatar */}
        <View style={styles.avatarWrapper}>
          <View style={styles.avatar}>
            <View style={styles.avatarFallback}>
              <ThemedText style={styles.avatarInitials}>
                {getInitials(STUDENT.firstName, STUDENT.lastName)}
              </ThemedText>
            </View>
          </View>
        </View>

        {/* Name */}
        <ThemedText style={styles.name}>
          {STUDENT.firstName} {STUDENT.lastName}
        </ThemedText>

        {/* Info Cards */}
        <View style={styles.infoSection}>
          <InfoCard icon="id-card-outline" label="รหัสนักศึกษา" value={STUDENT.studentId} />
          <InfoCard icon="school-outline" label="หลักสูตร" value={STUDENT.course} />
        </View>

        {/* Contact Buttons */}
        <ThemedText style={styles.sectionTitle}>ช่องทางติดต่อ</ThemedText>
        <View style={styles.contactSection}>
          {contactOptions.map((item) => (
            <TouchableOpacity
              key={item.type}
              style={styles.contactButton}
              onPress={() => handleContact(item.type, item.value)}
              activeOpacity={0.7}
            >
              <Ionicons name={item.icon as any} size={22} color="#555" />
              <View style={styles.contactTextContainer}>
                <ThemedText style={styles.contactLabel}>{item.label}</ThemedText>
                <ThemedText style={styles.contactValue} numberOfLines={1}>
                  {item.value}
                </ThemedText>
              </View>
              <Ionicons name="open-outline" size={16} color="#999" />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </ThemedView>
  );
}

function InfoCard({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <View style={styles.infoCard}>
      <Ionicons name={icon as any} size={20} color="#555" style={styles.infoIcon} />
      <View style={styles.infoTextContainer}>
        <ThemedText style={styles.infoLabel}>{label}</ThemedText>
        <ThemedText style={styles.infoValue}>{value}</ThemedText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    alignItems: 'center',
    paddingBottom: 40,
    paddingTop: 80,
  },
  avatarWrapper: {
    alignItems: 'center',
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 65,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  avatarFallback: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e0e0e0',
  },
  avatarInitials: {
    fontSize: 40,
    fontWeight: '700',
    color: '#333',
  },
  name: {
    fontSize: 26,
    fontWeight: 'bold',
    marginTop: 16,
    textAlign: 'center',
  },
  infoSection: {
    width: '100%',
    paddingHorizontal: 24,
    marginTop: 24,
    gap: 12,
  },
  infoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    backgroundColor: '#fff',
  },
  infoIcon: {
    marginRight: 14,
  },
  infoTextContainer: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 13,
    color: '#888',
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    alignSelf: 'flex-start',
    marginLeft: 24,
    marginTop: 32,
    marginBottom: 12,
  },
  contactSection: {
    width: '100%',
    paddingHorizontal: 24,
    gap: 10,
  },
  contactButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    backgroundColor: '#fff',
  },
  contactTextContainer: {
    flex: 1,
    marginLeft: 14,
  },
  contactLabel: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 2,
    color: '#555',
  },
  contactValue: {
    fontSize: 15,
    color: '#888',
  },
});
