import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
  ScrollView,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import FooterBar from '../Common/footer';
import apiClient from '../apiClient';
import { Delete_icon } from '../Common/icon';

export const Vehicle_Details = (props: {
  navigation: { navigate: (arg0: string) => void };
}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchData = async (page: number = 1, limit: number = 10) => {
    try {
      if (page === 1) {
        setLoading(true);
      } else {
        setLoadingMore(true);
      }

      const response = await apiClient.get(`userRequests?page=${page}&limit=${limit}`);
      const requests = response.data.requests;
      const totalPages = response.data.totalPages;

      if (requests && Array.isArray(requests)) {
        if (page === 1) {
          //@ts-ignore
          setData(requests); // Initial load
        } else {
          //@ts-ignore
          setData(prevData => [...prevData, ...vehicles]); // Append new data
        }
        setTotalPages(totalPages);
      } else {
        console.error('No vehicles data found');
      }

      setLoading(false);
      setLoadingMore(false);
    } catch (error: any) {
      console.error('Error fetching data:', error.message || error);
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    fetchData(currentPage); // Initial fetch
  }, []);

  const loadMoreData = () => {
    if (currentPage < totalPages && !loadingMore) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      fetchData(nextPage);
    }
  };

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    const isCloseToBottom =
      layoutMeasurement.height + contentOffset.y >= contentSize.height - 20; // Adjust the threshold as needed
    if (isCloseToBottom && !loadingMore) {
      loadMoreData();
    }
  };

  const handleEdit = async (vehicleId: string) => {
    //@ts-ignore
    props.navigation.navigate('Edit Vehicle', { VehicleID: vehicleId });
  };

  const handleDelete = (vehicleId: string) => {
    Alert.alert(
      'Confirm Deletion',
      'Are you sure you want to delete this vehicle?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: async () => {
            try {
              await apiClient.delete(`vehicles/${vehicleId}`);
              fetchData(currentPage); // Refresh the data after deletion
            } catch (error: any) {
              console.error('Error deleting vehicle:', error.message || error);
            }
          },
        },
      ],
    );
  };

  return (
    <View style={styles.outerContainer}>
      {loading ? (
        <ActivityIndicator size="large" color="#000" />
      ) : (
        <ScrollView onScroll={handleScroll} scrollEventThrottle={16}>
          {data.map((item: any, index: number) => (
            <View
              key={ index} // Ensure key is unique, fallback to index if no ID
              style={styles.vehicle_container}>
              <Text style={styles.vehicle_name}>
                {item.vehicleNumber} ({item.vehicleType})
              </Text>
              <TouchableOpacity
                style={styles.iconTextContainer}
                onPress={() => handleDelete(item._id)}>
                <Delete_icon />
              </TouchableOpacity>
            </View>
          ))}
          {loadingMore && <ActivityIndicator size="small" color="#000" />}
        </ScrollView>
      )}
      <FooterBar />
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: '#f4f4f4',
  },
  vehicle_container: {
    marginHorizontal: 20,
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  vehicle_name: {
    fontSize: 18,
    color: '#000',
    fontWeight: '500',
  },
  iconTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default Vehicle_Details;
