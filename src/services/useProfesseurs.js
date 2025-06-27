import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import apiService from "./apiService";

export const useProfesseurs = () => {
  const queryClient = useQueryClient();

  const getAll = () =>
    useQuery({
      queryKey: ["professor"],
      queryFn: () => apiService.getAll("professor"),
    });

  const create = useMutation({
    mutationFn: (data) => apiService.create("professor", data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["professor"] }),
  });

  const update = () =>
    useMutation({
      mutationFn: ({ id, data }) => apiService.update("professor", id, data),
      onSuccess: () =>
        queryClient.invalidateQueries({ queryKey: ["professor"] }),
    });

  const remove = () =>
    useMutation({
      mutationFn: (id) => apiService.remove("professor", id),
      onSuccess: () =>
        queryClient.invalidateQueries({ queryKey: ["professor"] }),
    });

  return { getAll, create, update, remove };
};
