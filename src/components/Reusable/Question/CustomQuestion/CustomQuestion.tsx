import React from 'react';
import Modal from '@material-ui/core/Modal';
import './CustomQuestion.scss';
import { ChoiceCard } from 'components/Reusable';
import {
  Code as CodeIcon,
  Videocam,
  CheckBox,
  KeyboardBackspace
} from '@material-ui/icons';
import { makeStyles } from '@material-ui/styles';

const useStyle = makeStyles(() => ({
  icon: {
    width: '90px',
    height: '90px',
    color: '#8c8989'
  },
  backSpace: {
    fontSize: '50px',
    color: '#8c8989'
  }
}));

interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
}

const CustomQuestion = (props: Props) => {
  const styles = useStyle();

  const { open, setOpen } = props;

  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <div className="bg-white modalCenter">
        <div className="modalTitle flex justify-between items-center">
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="border-none outline-none shadow-none"
            style={{ border: 'none !important' }}
          >
            <KeyboardBackspace className={styles.backSpace} />
          </button>
          <div>
            <h1>Create Your custom Question</h1>
            <p>First, choose choose the most appropriate question type</p>
          </div>
        </div>
        <div className="flex justify-around items-center flex-wrap mt-5">
          <div className="questionChoice">
            <ChoiceCard
              title="Performance Based Questions/Live Coding"
              image={<CodeIcon className={styles.icon} />}
              description="Create a coding task in various programming languages and add
  different test cases to validate candidate solutions"
            />
          </div>
          <div className="questionChoice">
            <ChoiceCard
              title="Multiple Choice Question (MCQ)"
              image={<CheckBox className={styles.icon} />}
              description="Split your question into multiple groups, each with multiple
          answer options where more than one answer is correct."
            />
          </div>
          <div className="questionChoice">
            <ChoiceCard
              title="Video Based Question (MCQ)"
              image={<Videocam className={styles.icon} />}
              description="Record a video splitting your question into multiple groups, each
    with multiple answer options where more than one answer is correct.
    (Soft skills)"
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default CustomQuestion;
