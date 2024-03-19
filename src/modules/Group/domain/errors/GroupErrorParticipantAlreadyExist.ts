export class GroupErrorParticipantAlreadyExist extends Error {
  constructor (message: string = 'Participant already exist') {
    super(message)
    this.name = this.constructor.name
  }
}
