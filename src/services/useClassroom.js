import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import apiService from "./apiService";

export const useClassroom = () => {
  const queryClient = useQueryClient();

  const getAll = () =>
    useQuery({
      queryKey: ["classroom"],
      queryFn: () => apiService.getAll("classroom"),
    });

  const create = useMutation({
    mutationFn: (data) => apiService.create("classroom", data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["classroom"] }),
  });

  const update = () =>
    useMutation({
      mutationFn: ({ id, data }) => apiService.update("classroom", id, data),
      onSuccess: () =>
        queryClient.invalidateQueries({ queryKey: ["classroom"] }),
    });

  const remove = () =>
    useMutation({
      mutationFn: (id) => apiService.remove("classroom", id),
      onSuccess: () =>
        queryClient.invalidateQueries({ queryKey: ["classroom"] }),
    });

  return { getAll, create, update, remove };
};
