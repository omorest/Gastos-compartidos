import { type UseCase } from './UseCase'

export interface Command<Request = void, Response = void> extends UseCase<Request, Response> { }
