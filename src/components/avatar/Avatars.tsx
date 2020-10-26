import React, { FC, Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    '& > *': {
      // margin: theme.spacing(8),
      width: '120px',
      height: '120px',
      marginLeft: '4rem'
    }
  },
  large: {
    width: theme.spacing(8),
    height: theme.spacing(8)
  }
}));

const Avatars: FC = () => {
  const classes = useStyles();
  return (
    <Fragment>
      <div className={classes.root}>
        <Avatar
          sizes="20px"
          alt="Remy Sharp"
          src="https://artriva.com/media/k2/items/cache/c889234799e865bbe90cee71f6cd2e53_XL.jpg"
        />
      </div>
    </Fragment>
  );
};

export default Avatars;
