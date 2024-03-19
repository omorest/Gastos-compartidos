import { type UseCase } from './UseCase'

export interface Query<Response, Request = void> extends UseCase<Request, Response> {

}
