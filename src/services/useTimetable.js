import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import apiService from "./apiService";

export const useTimetable = () => {
  const queryClient = useQueryClient();

  const getAll = () =>
    useQuery({
      queryKey: ["timetable"],
      queryFn: () => apiService.getAll("timetable"),
    });

  const create = useMutation({
    mutationFn: (data) => apiService.create("timetable", data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["timetable"] }),
  });

  const update = () =>
    useMutation({
      mutationFn: ({ id, data }) => apiService.update("timetable", id, data),
      onSuccess: () =>
        queryClient.invalidateQueries({ queryKey: ["timetable"] }),
    });

  const remove = () =>
    useMutation({
      mutationFn: (id) => apiService.remove("timetable", id),
      onSuccess: () =>
        queryClient.invalidateQueries({ queryKey: ["timetable"] }),
    });

  return { getAll, create, update, remove };
};
