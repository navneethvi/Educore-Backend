import { INewTutor, ITutor } from "../interfaces/tutor.interface";
import Tutor from "../models/tutor.model";

import { ITutorRepository } from "../interfaces/tutor.repository.interface";

class TutorRepository implements ITutorRepository {
  public async findTutor(email: string): Promise<ITutor | null> {
    return await Tutor.findOne({ email }).exec();
  }

  public async createTutor(tutorData: INewTutor): Promise<ITutor> {
    const tutor = new Tutor(tutorData);
    return await tutor.save();
  }
}

export default TutorRepository;
