import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  StyleSheet, 
  ActivityIndicator 
} from 'react-native';
import { productApi, Vendor } from '../services/api';
import { useTheme } from '../context/ThemeContext';
import { StyledView, StyledText, StyledScrollView, StyledTouchableOpacity } from './styles';

interface VendorFilterProps {
  onVendorSelect: (vendorName: string) => void;
  selectedVendor: string;
}

const VendorFilter: React.FC<VendorFilterProps> = ({ onVendorSelect, selectedVendor }) => {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const { theme, isDark } = useTheme();

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        setLoading(true);
        setError(false);
        
        // API bağlantı sorunu olabilir, hard-coded vendor listesi (yedek)
        const fallbackVendors = [
          { name: 'Sobe Istanbul' },
          { name: 'Tuba' },
          { name: 'Black Fashion' },
          { name: 'Setre' }
        ];
        
        // Önce API'den almayı dene
        const data = await productApi.getVendors();
        
        if (data && data.length > 0) {
          setVendors(data);
        } else {
          setVendors(fallbackVendors);
        }
      } catch (error) {
        console.error('Vendor verileri yüklenirken hata:', error);
        // Hata durumunda hard-coded listeyi göster
        setVendors([
          { name: 'Sobe Istanbul' },
          { name: 'Tuba' },
          { name: 'Black Fashion' },
          { name: 'Setre' }
        ]);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchVendors();
  }, []);

  const styles = StyleSheet.create({
    container: {
      paddingVertical: 10,
      paddingHorizontal: 15,
    },
    filterScroll: {
      paddingBottom: 5,
    },
    filterChip: {
      paddingHorizontal: 15,
      paddingVertical: 8,
      borderRadius: 20,
      marginRight: 10,
      backgroundColor: isDark ? '#333' : '#e8e8e8',
      borderWidth: 1,
      borderColor: isDark ? '#444' : '#ddd',
    },
    selectedChip: {
      backgroundColor: isDark ? '#532d3c' : '#b87a8a',
      borderColor: isDark ? '#532d3c' : '#b87a8a',
    },
    filterText: {
      fontSize: 14,
      color: isDark ? '#e0e0e0' : '#333',
    },
    selectedText: {
      color: '#fff',
      fontWeight: '500',
    },
    loadingContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10,
    },
    loadingText: {
      marginLeft: 10,
      color: isDark ? '#e0e0e0' : '#333',
    },
    errorText: {
      color: '#ff5252',
      fontSize: 12,
      textAlign: 'right',
      marginTop: 5,
    }
  });


  return (
    <StyledView style={styles.container}>
      <StyledScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.filterScroll}
      >
        {/* All option */}
        <StyledTouchableOpacity
          style={[
            styles.filterChip,
            selectedVendor === 'all' ? styles.selectedChip : null
          ]}
          onPress={() => onVendorSelect('all')}
        >
          <StyledText 
            style={[
              styles.filterText,
              selectedVendor === 'all' ? styles.selectedText : null
            ]}
          >
            Tümü
          </StyledText>
        </StyledTouchableOpacity>
        
        {/* Vendor options */}
        {vendors.map((vendor, index) => (
          <StyledTouchableOpacity
            key={`vendor-${index}`}
            style={[
              styles.filterChip,
              selectedVendor === vendor.name ? styles.selectedChip : null
            ]}
            onPress={() => onVendorSelect(vendor.name)}
          >
            <StyledText 
              style={[
                styles.filterText,
                selectedVendor === vendor.name ? styles.selectedText : null
              ]}
            >
              {vendor.name}
            </StyledText>
          </StyledTouchableOpacity>
        ))}
      </StyledScrollView>
      {error && <StyledText style={styles.errorText}>* API bağlantı sorunu, varsayılan veriler gösteriliyor</StyledText>}
    </StyledView>
  );
};

export default VendorFilter; 