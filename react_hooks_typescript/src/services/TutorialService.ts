import ITutorialData from "../types/Tutorial";
import httpCommon from "../utils/helpers";

const getAll = () => {
  return httpCommon.get<Array<ITutorialData>>("/tutorials/");
};

const get = (id: number) => {
  return httpCommon.get<ITutorialData>(`/tutorials/${id}/`);
};

const create = (data: ITutorialData) => {
  return httpCommon.post<ITutorialData>("/tutorials/", data);
};

const update = (id: number, data: ITutorialData) => {
  return httpCommon.put<ITutorialData>(`/tutorials/${id}/`, data);
};

const remove = (id: number) => {
  return httpCommon.delete<ITutorialData>(`/tutorials/${id}/`);
};

const removeAll = () => {
  return httpCommon.delete<ITutorialData>("/tutorials/");
};

const findByTitle = (title: string) => {
  return httpCommon.get<Array<ITutorialData>>(`/tutorials?title=${title}/`);
};

const TutorialService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByTitle,
};

export default TutorialService;
