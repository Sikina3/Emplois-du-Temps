import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import apiService from "./apiService";

export const useTrackSubject = () => {
  const queryClient = useQueryClient();

  const getAll = () =>
    useQuery({
      queryKey: ["academic_track"],
      queryFn: () => apiService.getAll("academic_track"),
    });

  const create = useMutation({
    mutationFn: (data) => apiService.create("academic_track", data),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["academic_track"] }),
  });

  const update = () =>
    useMutation({
      mutationFn: ({ id, data }) =>
        apiService.update("academic_track", id, data),
      onSuccess: () =>
        queryClient.invalidateQueries({ queryKey: ["academic_track"] }),
    });

  const remove = () =>
    useMutation({
      mutationFn: (id) => apiService.remove("academic_track", id),
      onSuccess: () =>
        queryClient.invalidateQueries({ queryKey: ["academic_track"] }),
    });

  return { getAll, create, update, remove };
};
