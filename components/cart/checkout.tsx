import { Button, Group, Stack, Stepper } from '@mantine/core';
import { useState } from 'react';
import { MAIN_CONTENT_HEIGHT } from '../../lib/constants';

const Checkout: React.FC = () => {
  const [active, setActive] = useState(1);
  const nextStep = () =>
    setActive((current) => (current < 3 ? current + 1 : current));
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

  return (
    <div
      style={{
        paddingLeft: '12%',
        paddingRight: '12%',
        paddingTop: '3%',
        paddingBottom: '3%',
        height: MAIN_CONTENT_HEIGHT,
      }}
    >
      <Stepper active={active} onStepClick={setActive} breakpoint="xs">
        <Stepper.Step label="First step" description="Enter your contact info">
          Step 1 content: Create an account
        </Stepper.Step>
        <Stepper.Step label="Second step" description="Provide payment details">
          Step 2 content: Verify email
        </Stepper.Step>
        <Stepper.Step
          label="Final step"
          description="Review and place your order"
        >
          Step 3 content: Get full access
        </Stepper.Step>
        <Stepper.Completed>
          Completed, click back button to get to previous step
        </Stepper.Completed>
      </Stepper>

      <div
        style={{
          position: 'fixed',
          bottom: '2%',
          left: '0',
          right: '0',
        }}
      >
        <Group mt="xl" position="center">
          <Button variant="default" onClick={prevStep}>
            Back
          </Button>
          <Button onClick={nextStep}>Next step</Button>
        </Group>
      </div>
    </div>
  );
};

export default Checkout;
