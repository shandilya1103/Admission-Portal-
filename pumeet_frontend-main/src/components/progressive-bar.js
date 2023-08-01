import * as React from 'react';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

const BorderLinearProgress = styled(LinearProgress)((props) => ({
  height: 10,
  borderRadius: 100,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: props.theme.palette.grey[200],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: props.BarColor,
  },
}));

function LinearProgressWithLabel(props) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 8 }}>
        <BorderLinearProgress variant="determinate" BarColor={props.BarColor} {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color={props.BarColor}>{`${Math.round(
          props.value,
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

export default function LinearWithValueLabel(props) {
  const [progress, setProgress] = React.useState(0);

  const { title, color, value } = props;
    
  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => (prevProgress >= value ? value : prevProgress + 10));
    }, 50);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <Box sx={{ width: '100%' }}>
        <Typography variant="body1" color="rgba(86, 100, 116, 1)">
            {title}
        </Typography>
        <LinearProgressWithLabel value={progress} BarColor={color} />
    </Box>
  );
}
