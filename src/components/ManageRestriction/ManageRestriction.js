import React, { useState, useEffect } from 'react';
import { Button, TextField, MenuItem, Select, FormControl, InputLabel, Grid, Typography, Table, TableBody, TableRow, TableCell, Container } from '@mui/material';

const EvaluationRestriction = () => {
  const [restrictions, setRestrictions] = useState([]);
  const [facultyList, setFacultyList] = useState([]);
  const [classList, setClassList] = useState([]);
  const [subjectList, setSubjectList] = useState([]);
  const [facultyId, setFacultyId] = useState('');
  const [classId, setClassId] = useState('');
  const [subjectId, setSubjectId] = useState('');

  useEffect(() => {
    // Replace with actual API calls
    setFacultyList([{ id: 1, name: 'Faculty A' }, { id: 2, name: 'Faculty B' }]);
    setClassList([{ id: 1, class: 'Class 1A' }, { id: 2, class: 'Class 2B' }]);
    setSubjectList([{ id: 1, subj: 'Math' }, { id: 2, subj: 'Science' }]);
  }, []);

  const handleAddToList = () => {
    if (facultyId && classId && subjectId) {
      setRestrictions((prev) => [...prev, { facultyId, classId, subjectId }]);
      setFacultyId('');
      setClassId('');
      setSubjectId('');
    }
  };

  return (
    <Container>
      <Typography variant="h5" gutterBottom>
        Evaluation Restriction
      </Typography>

      <Grid container spacing={2} style={{ marginTop: 20 }}>
        <Grid item xs={12} sm={4}>
          <FormControl fullWidth>
            <InputLabel>Faculty</InputLabel>
            <Select value={facultyId} onChange={(e) => setFacultyId(e.target.value)} fullWidth>
              {facultyList.map((faculty) => (
                <MenuItem key={faculty.id} value={faculty.id}>
                  {faculty.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControl fullWidth>
            <InputLabel>Class</InputLabel>
            <Select value={classId} onChange={(e) => setClassId(e.target.value)} fullWidth>
              {classList.map((cls) => (
                <MenuItem key={cls.id} value={cls.id}>
                  {cls.class}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControl fullWidth>
            <InputLabel>Subject</InputLabel>
            <Select value={subjectId} onChange={(e) => setSubjectId(e.target.value)} fullWidth>
              {subjectList.map((subject) => (
                <MenuItem key={subject.id} value={subject.id}>
                  {subject.subj}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <Button
        variant="contained"
        color="primary"
        onClick={handleAddToList}
        style={{ marginTop: '20px', display: 'block' }}
      >
        Add to List
      </Button>

      <Table style={{ marginTop: '20px' }}>
        <TableBody>
          {restrictions.map((restriction, idx) => (
            <TableRow key={idx}>
              <TableCell>{facultyList.find((f) => f.id === restriction.facultyId)?.name}</TableCell>
              <TableCell>{classList.find((c) => c.id === restriction.classId)?.class}</TableCell>
              <TableCell>{subjectList.find((s) => s.id === restriction.subjectId)?.subj}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
};

export default EvaluationRestriction;
