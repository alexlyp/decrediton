import Overview from "./Overview";

@autobind
class AgendaOverview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedChoiceId: this.props.selectedChoice,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.selectedChoice != nextProps.selectedChoice) {
      this.setState({ selectedChoiceId: nextProps.selectedChoice });
    }
  }

  render() {
    const { agenda, closeCurrentAgenda, loading, disabled } = this.props;
    const { selectedChoiceId } = this.state;
    const { setSelecedChoiceId, updatePreferences } = this;
    const activeChoiceId = this.props.selectedChoice;
    const agendaId = agenda.getId();
    const agendaDescription = agenda.getDescription();
    const choices = agenda.getChoicesList().map(choice => ({
      choiceId: choice.getId(),
    }));
    const hasModifiedChoice = this.hasModifiedChoice();

    return (
      <Overview
        {...{
          agendaId,
          agendaDescription,
          selectedChoiceId,
          activeChoiceId,
          hasModifiedChoice,
          choices,
          setSelecedChoiceId,
          updatePreferences,
          closeCurrentAgenda,
          disabled,
          loading
        }}
      />
    );
  }

  setSelecedChoiceId(selectedChoiceId) {
    this.setState({ selectedChoiceId });
  }

  hasModifiedChoice() {
    return this.state.selectedChoiceId !== this.props.selectedChoice;
  }

  updatePreferences() {
    if (!this.hasModifiedChoice()) return;
    this.props.updatePreferences(this.props.agenda.getId(), this.state.selectedChoiceId);
  }
}

export default AgendaOverview;
