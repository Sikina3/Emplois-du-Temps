import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import apiService from "./apiService";

export const useLevels = () => {
  const queryClient = useQueryClient();

  const getAll = () =>
    useQuery({
      queryKey: ["level"],
      queryFn: () => apiService.getAll("level"),
    });

  const create = useMutation({
    mutationFn: (data) => apiService.create("level", data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["level"] }),
  });

  const update = () =>
    useMutation({
      mutationFn: ({ id, data }) => apiService.update("level", id, data),
      onSuccess: () => queryClient.invalidateQueries({ queryKey: ["level"] }),
    });

  const remove = () =>
    useMutation({
      mutationFn: (id) => apiService.remove("level", id),
      onSuccess: () => queryClient.invalidateQueries({ queryKey: ["level"] }),
    });

  return { getAll, create, update, remove };
};
