import * as React from 'react';
import { OTPInput, OTPInputContext } from 'input-otp';
import { Box, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledOTPInput = styled(OTPInput)({
  display: 'flex',
  gap: '0.5rem',
  alignItems: 'center',
});

const InputOTPSlot = React.forwardRef<
  HTMLInputElement,
  { index: number; [key: string]: any }
>(({ index, ...props }, ref) => {
  const inputOTPContext = React.useContext(OTPInputContext);
  const { char, hasFakeCaret, isActive } = inputOTPContext.slots[index] || {};

  return (
    <TextField
      ref={ref}
      variant="outlined"
      value={char || ''}
      inputProps={{
        style: {
          textAlign: 'center',
          width: '2.5rem',
          height: '2.5rem',
          padding: 0,
          fontSize: '1.25rem',
          position: 'relative',
        },
        ...props,
      }}
      sx={{
        '& .MuiOutlinedInput-root': {
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: 'primary.main',
            borderWidth: '2px',
          },
          ...(isActive && {
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: 'primary.main',
              borderWidth: '2px',
            },
          }),
        },
      }}
    >
      {hasFakeCaret && (
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '2px',
            height: '1.25rem',
            backgroundColor: 'primary.main',
            animation: 'caret-blink 1s infinite',
            '@keyframes caret-blink': {
              '0%, 100%': { opacity: 1 },
              '50%': { opacity: 0 },
            },
          }}
        />
      )}
    </TextField>
  );
});

type OTPProps = {
  length: number;
  pattern?: string;
  value: string;
  onChange: (val: string) => void;
  className?: string;
};

export function OTP({ length, pattern, value, onChange, className }: OTPProps) {
  return (
    <StyledOTPInput
      maxLength={length}
      pattern={pattern}
      value={value}
      onChange={onChange}
      containerClassName={className}
    >
      <div
        style={{
          display: 'flex',
          gap: '0.5rem',
          justifyContent: 'center',
          width: '100%',
        }}
      >
        {Array.from({ length }).map((_, index) => (
          <InputOTPSlot key={index} index={index} />
        ))}
      </div>
    </StyledOTPInput>
  );
}
