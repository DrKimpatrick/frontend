import React, { FC } from 'react';
import { Text, View, Image, StyleSheet } from '@react-pdf/renderer';
import logo from 'assets/images/logo-image.png';

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#ffffff'
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  },
  topContainer: {
    display: 'flex',
    flexDirection: 'row',
    padding: 5
  },
  image: {
    height: 80,
    width: 80
  }
});

interface Props {
  title?: string;
}

const TopPart: FC<Props> = ({ title }) => {
  return (
    <View>
      <View style={styles.topContainer}>
        <Image style={styles.image} source={logo} />
        <View style={{ display: 'flex', justifyContent: 'center' }}>
          <Text
            style={{
              color: 'gray',
              marginLeft: 140,
              marginTop: '24',
              fontSize: 16
            }}
          >
            {title}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default TopPart;
