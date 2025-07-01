import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import apiService from "./apiService";

export const useSubjects = () => {
  const queryClient = useQueryClient();

  const getAll = () =>
    useQuery({
      queryKey: ["subject"],
      queryFn: () => apiService.getAll("subject"),
    });

  const create = useMutation({
    mutationFn: (data) => apiService.create("subject", data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["subject"] }),
  });

  const update = () =>
    useMutation({
      mutationFn: ({ id, data }) => apiService.update("subject", id, data),
      onSuccess: () => queryClient.invalidateQueries({ queryKey: ["subject"] }),
    });

  const remove = () =>
    useMutation({
      mutationFn: (id) => apiService.remove("subject", id),
      onSuccess: () => queryClient.invalidateQueries({ queryKey: ["subject"] }),
    });

  const linkToTrack = () =>
    useMutation({
      mutationFn: ({ subjectId, trackId }) =>
        apiService.linkSubjectToTrack(subjectId, trackId),
      onSuccess: () => queryClient.invalidateQueries({ queryKey: ["subject"] }),
    });

  const getByAcademicTrack = (academicTrackId) =>
    useQuery({
      queryKey: ["subject", academicTrackId],
      queryFn: () => apiService.getTrack("subject", { academicTrackId }),
    });

  return { getAll, create, update, remove, linkToTrack, getByAcademicTrack };
};
