import { ScrollView, StyleSheet, TouchableOpacity, View, Linking, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useThemeColor } from '@/hooks/use-theme-color';

const STUDENT = {
  firstName: 'พัทธดนย์',
  lastName: 'กาญจนอุดมการ',
  studentId: '66030236',
  course: 'วิศวกรรมคอมพิวเตอร์ (CPE)',
  email: 'pat@example.com',
  phone: '080-000-0000',
  github: 'patkamon',
  facebook: 'patkamon',
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
  const accent = useThemeColor({}, 'tint');

  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Header Background */}
        <View style={[styles.headerBg, { backgroundColor: accent }]}>
          <View style={styles.headerOverlay} />
        </View>

        {/* Avatar */}
        <View style={styles.avatarWrapper}>
          <View style={[styles.avatar, { backgroundColor: '#fff' }]}>
            <View style={[styles.avatarFallback, { backgroundColor: accent }]}>
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
              style={[styles.contactButton, { borderColor: accent + '30' }]}
              onPress={() => handleContact(item.type, item.value)}
              activeOpacity={0.7}
            >
              <Ionicons name={item.icon as any} size={22} color={accent} />
              <View style={styles.contactTextContainer}>
                <ThemedText style={styles.contactLabel}>{item.label}</ThemedText>
                <ThemedText style={styles.contactValue} numberOfLines={1}>
                  {item.value}
                </ThemedText>
              </View>
              <Ionicons name="open-outline" size={16} color={accent} />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </ThemedView>
  );
}

function InfoCard({ icon, label, value }: { icon: string; label: string; value: string }) {
  const accent = useThemeColor({}, 'tint');

  return (
    <View style={[styles.infoCard, { borderLeftColor: accent }]}>
      <Ionicons name={icon as any} size={20} color={accent} style={styles.infoIcon} />
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
  },
  headerBg: {
    width: '100%',
    height: 180,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    position: 'absolute',
    top: 0,
  },
  headerOverlay: {
    ...StyleSheet.absoluteFillObject,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    opacity: 0.15,
  },
  avatarWrapper: {
    marginTop: 100,
    alignItems: 'center',
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 65,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  avatarFallback: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarInitials: {
    fontSize: 40,
    fontWeight: '700',
    color: '#fff',
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
    borderLeftWidth: 4,
    backgroundColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  infoIcon: {
    marginRight: 14,
  },
  infoTextContainer: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 13,
    opacity: 0.6,
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '600',
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
    borderWidth: 1.5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  contactTextContainer: {
    flex: 1,
    marginLeft: 14,
  },
  contactLabel: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 2,
  },
  contactValue: {
    fontSize: 15,
    opacity: 0.7,
  },
});
