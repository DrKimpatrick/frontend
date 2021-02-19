import React, { FC } from 'react';
import { MiddlePart, TopPart } from 'components/Reusable/Reports';
import { Page, Document, StyleSheet } from '@react-pdf/renderer';

interface Props {
  title?: string;
  name?: string;
  description?: string;
  headers?: string[];
  items?: any[];
  mainHeader?: string;
  type?: string;
}

const AdminReports: FC<Props> = ({
  title,
  name,
  description,
  headers,
  items,
  mainHeader,
  type
}) => {
  const styles = StyleSheet.create({
    page: {
      backgroundColor: '#ffffff'
    }
  });

  return (
    <Document>
      <Page style={styles.page} size="A4">
        <TopPart title={title} />
        <MiddlePart
          nameValue={name}
          description={description}
          items={items}
          headers={headers}
          mainHeader={mainHeader}
          type={type}
        />
      </Page>
    </Document>
  );
};

export default AdminReports;
