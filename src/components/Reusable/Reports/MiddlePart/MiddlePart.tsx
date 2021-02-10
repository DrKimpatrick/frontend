import React, { FC } from 'react';
import {
  Text,
  View,
  StyleSheet
} from '@react-pdf/renderer';

interface Props {
  nameValue?: string;
  description?: string;
  headers?: string[];
  items?: any[];
  mainHeader?: string;
  type?: string;
}

const MiddlePart: FC<Props> = ({
  nameValue,
  description,
  items,
  headers,
  mainHeader,
  type
}) => {
  const BORDER_COLOR = '#bfbfbf';
  const BORDER_STYLE = 'solid';
  const COL1_WIDTH = 20;
  const COLN_WIDTH = (100 - COL1_WIDTH) / (type === 'course' ? 6 : 5);

  const styles = StyleSheet.create({
    body: {
      display: 'flex',
      marginTop: 20,
      justifyContent: 'center',
      color: 'gray',
      marginLeft: 20
    },
    title: {
      textTransform: 'capitalize',
      fontSize: 18,
      margin: 0
    },
    description: {
      fontSize: 10
    },
    table: {
      display: 'table',
      width: 'auto'
    },
    tableRow: {
      flexDirection: 'row'
    },
    tableCol1Header: {
      width: COL1_WIDTH + '%',
      borderStyle: BORDER_STYLE,
      borderBottomColor: BORDER_COLOR,
      borderBottomWidth: 1
    },
    tableColHeader: {
      width: COLN_WIDTH + '%',
      borderStyle: BORDER_STYLE,
      borderBottomColor: BORDER_COLOR,
      borderBottomWidth: 1
    },
    tableCol1: {
      width: COL1_WIDTH + '%',
      borderStyle: BORDER_STYLE,
      borderBottomColor: BORDER_COLOR,
      borderBottomWidth: 1
    },
    tableCol: {
      width: COLN_WIDTH + '%',
      borderStyle: BORDER_STYLE,
      borderBottomColor: BORDER_COLOR,
      borderBottomWidth: 1
    },
    tableCellHeader: {
      marginLeft: 5,
      marginTop: 5,
      marginBottom: 5,
      fontSize: 11,
      fontWeight: 'bold'
    },
    tableCell: {
      marginLeft: 5,
      marginTop: 5,
      marginBottom: 5,
      fontSize: 10
    }
  });

  return (
    <View style={styles.body}>
      <View style={{ display: 'flex', justifyContent: 'center' }}>
        <View>
          <View style={{ marginBottom: 16 }}>
            <Text style={styles.title}>{nameValue}</Text>
            <Text style={styles.description}>{description}</Text>
          </View>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <View style={styles.tableCol1Header}>
                <Text style={styles.tableCellHeader}>{mainHeader}</Text>
              </View>
              {headers?.map((item: any) => (
                <View style={styles.tableColHeader}>
                  <Text style={styles.tableCellHeader}>{item}</Text>
                </View>
              ))}
            </View>
            {items?.map((item: any) => {
              return type === 'course' ? (
                <View style={styles.tableRow}>
                  <View style={styles.tableCol1}>
                    <Text style={styles.tableCell}>{item.name}</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>{item.price}</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>{ `${item.duration} ${item.format}`}</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>{ item.level}</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>{ item.views.length}</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>{item.instructor}</Text>
                  </View>
                </View>
              ) : (
                <View style={styles.tableRow}>
                  <View style={styles.tableCol1}>
                    <Text style={styles.tableCell}>{item.username}</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>{item.courses.length}</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>
                      {item.verified ? 'Yes' : 'No'}
                    </Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>533</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>332</Text>
                  </View>
                </View>
              );
            })}
          </View>
          <View
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginLeft: 400
            }}
          >
            <Text style={{ marginLeft: 10, marginTop: 5, fontSize: 12 }}>
              By <Text>Tech Talent LC</Text>
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default MiddlePart;
