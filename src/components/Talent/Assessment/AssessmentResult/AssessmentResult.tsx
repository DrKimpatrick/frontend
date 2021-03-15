import React, { FC } from 'react';
import { Check, AccessTime, Panorama, Clear } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

const results = [
  {
    item:
      'User and Group User and Group User and Group User and Group User and Group User and Group User and Group User and Group User and Group User and Group',
    status: 'passed',
    time: 'bad'
  },
  { item: 'User and Group', status: 'faile', time: 'good' },
  { item: 'User and Group', status: 'passed', time: 'average' }
];

const grade = '2.00 of 3.50 point awarded 87.8%';

const useStyles = makeStyles(() => ({
  actionIcon: {
    fontSize: 14
  },
  actionIconPassed: {
    fontSize: 14,
    color: '#008F72'
  },
  actionIconFailed: {
    fontSize: 14,
    color: '#AD050E'
  },
  actionIconGood: {
    fontSize: 14,
    color: '#008F72'
  },
  actionIconAverage: {
    fontSize: 14,
    color: '#F26D00'
  },
  actionIconBad: {
    fontSize: 14,
    color: '#AD050E'
  },
  marks: {
    fontSize: 10
  }
}));

const AssessmentResult: FC = () => {
  const styles = useStyles();

  const timecss = (time: any) => {
    let timeCss: any;
    switch (time) {
      case 'good':
        timeCss = styles.actionIconGood;
        break;
      case 'bad':
        timeCss = styles.actionIconBad;
        break;
      default:
        timeCss = styles.actionIconAverage;
    }
    return timeCss;
  };

  return (
    <div className="hello mx-5">
      <div className="">
        <p className="ml-10 text-xs py-1 pb-1 mr-8 text-gray-700">{grade}</p>
        {results.length > 0 && (
          <ul className="p-0 m-0">
            {results.map((item: any, i) => (
              <li key={i} className="py-1 py-1 rounded-sm">
                <div className="flex flex-row text-xs">
                  <div className="listActionAssessment flex-none">
                    <span>{i + 1}.</span>
                    <span>
                      {item.status === 'passed' ? (
                        <Check className={`${styles.actionIconPassed} ml-2`} />
                      ) : (
                        <Clear className={`${styles.actionIconFailed} ml-2`} />
                      )}
                    </span>
                    <span>
                      <AccessTime className={`${timecss(item.time)} ml-2`} />
                    </span>
                    <span>
                      <Panorama
                        className={`${styles.actionIcon} ml-2 text-gray-700`}
                      />
                    </span>
                  </div>
                  <span className="ml-2 text-9xl flex-1">{item.item}</span>
                  <span
                    className={`${styles.marks} text-gray-600 ml-2 flex-none`}
                  >
                    1.0 of 1.0
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AssessmentResult;
