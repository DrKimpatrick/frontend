import React, { useState, useEffect } from 'react';
import { Course } from 'redux/action-types/course';
import './ListCourseByLevel.scss';
import { filter } from 'lodash';
import { ListCourse } from '../ListCourse';

interface Props {
  level: string;
  courses: Course[];
  allowEditDelete?: boolean;
}

export const ListCourseByLevel = (props: Props) => {
  const [data, setData] = useState<Course[]>();

  const { level, courses, allowEditDelete } = props;

  useEffect(() => {
    const filterByLevel = filter(courses, item => item.level === level);

    setData(filterByLevel);
  }, [courses, level]);

  return (
    <div className="listCourseByLevel">
      {data && data.length > 0 && (
        <>
          <div className="level w-full">
            <span>{level}</span>
          </div>
          <ul className="bg-card-preview">
            {data.map((item, index) => (
              <ListCourse
                item={item}
                key={index}
                allowEditDelete={allowEditDelete}
              />
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default ListCourseByLevel;
