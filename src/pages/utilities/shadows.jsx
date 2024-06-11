// material-ui
import Grid from '@mui/material/Grid';

// project-imports
import MainCard from 'components/MainCard';
import ComponentWrapper from 'sections/components-overview/ComponentWrapper';
import ComponentSkeleton from 'sections/components-overview/ComponentSkeleton';

// ===============================|| SHADOW BOX ||=============================== //

// ============================|| COMPONENTS - SHADOW ||============================ //

export default function ComponentShadow() {
  return (
    <ComponentSkeleton>
      <ComponentWrapper>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <MainCard title="Account Overview" codeHighlight="true"></MainCard>
          </Grid>
        </Grid>
      </ComponentWrapper>
    </ComponentSkeleton>
  );
}
