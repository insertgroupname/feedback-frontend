import React from 'react';
import { Divider, Button, TextField, Box, Typography } from '@material-ui/core';
import { FieldArray, Form, Formik, getIn } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { updateItemDetailBaseline } from 'src/redux/actions/baselineActions';
import {
  openUpdateFailModal,
  openUpdateSuccessModal
} from 'src/redux/actions/modalActions';

const validationSchema = Yup.object().shape({
  wpmRange: Yup.array().of(
    Yup.object().shape({
      start: Yup.string().required('start value is required'),
      end: Yup.string().required('end value is required')
    })
  )
});

const GaugeForm = (props) => {
  const dispatch = useDispatch();
  const { arcRange, acceptable } = props;

  const baselineState = useSelector((state) => state.baseline);
  const { isLoading, error } = baselineState;

  return (
    <Formik
      initialValues={{
        wpmRange: arcRange
          ? arcRange
          : [
              {
                title: '',
                start: '',
                end: ''
              }
            ]
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        const formatWpmRange = values.wpmRange.map((ele) => [
          ele.start,
          ele.end
        ]);
        const formatData = {
          acceptableDisfluencyPerMinut: acceptable,
          WPMrange: formatWpmRange
        };
        dispatch(updateItemDetailBaseline(formatData));
        if (error) {
          dispatch(openUpdateFailModal());
        } else {
          dispatch(openUpdateSuccessModal());
        }
      }}
    >
      {({ values, touched, errors, handleChange, handleBlur }) => (
        <Form noValidate autoComplete="off">
          <FieldArray name="wpmRange">
            {() => (
              <div>
                {values.wpmRange.map((ele, index, arr) => {
                  const start = `wpmRange[${index}].start`;
                  const touchedStart = getIn(touched, start);
                  const errorStart = getIn(errors, start);
                  const end = `wpmRange[${index}].end`;
                  const touchedEnd = getIn(touched, end);
                  const errorEnd = getIn(errors, end);
                  return (
                    <div key={index}>
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          py: 2
                        }}
                      >
                        <Typography>{ele.title}</Typography>

                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '.5rem'
                          }}
                        >
                          <TextField
                            variant="outlined"
                            label="Start"
                            name={start}
                            size="small"
                            value={ele.start}
                            required
                            helperText={
                              touchedStart && errorStart ? errorStart : ''
                            }
                            error={Boolean(touchedStart && errorStart)}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          <Typography>To</Typography>
                          <TextField
                            variant="outlined"
                            label="End"
                            size="small"
                            name={end}
                            value={ele.end}
                            required
                            helperText={touchedEnd && errorEnd ? errorEnd : ''}
                            error={Boolean(touchedEnd && errorEnd)}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                        </Box>
                      </Box>
                      {arr.length - 1 === index ? null : <Divider />}
                    </div>
                  );
                })}
              </div>
            )}
          </FieldArray>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end'
            }}
          >
            <Button
              disabled={isLoading}
              type="submit"
              color="primary"
              variant="contained"
            >
              Update
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default GaugeForm;
