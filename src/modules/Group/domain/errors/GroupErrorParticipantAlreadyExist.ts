export class GroupErrorParticipantAlreadyExist extends Error {
  constructor (message: string = 'Participants already exist in the group') {
    super(message)
    this.name = this.constructor.name
  }
}
