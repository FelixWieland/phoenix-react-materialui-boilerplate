

defmodule RenameProject do

  def start do
    IO.puts("RENAME PROJECT")
    #old_project_name = IO.gets("Old Project Name: ")
    #new_project_name = IO.gets("New Project Name: ")
    old_project_name = "boilerplate"
    new_project_name = "boilerpalte"

    filtered_files = FlatFiles.list_all("./")
      |> filter_out_folders(old_project_name)
      |> rename_specific_files!(old_project_name, new_project_name)
      |> Enum.to_list

  end

  def filter_out_folders(allFiles, old_project_name) do
    Stream.filter(allFiles, fn file_path ->

        String.contains?(file_path, old_project_name)
        or String.contains?(file_path, "test")
        and not String.contains?(file_path, "node_modules")

    end)
  end

  def rename_specific_files!(pre_filtered_files, old_project_name, new_project_name) do
    Stream.filter(pre_filtered_files, fn file_path ->

      String.contains?(file_path, old_project_name <> "_web.ex") or
      String.contains?(file_path, old_project_name <> "_web.exs") or
      String.contains?(file_path, old_project_name <> ".ex") or
      String.contains?(file_path, old_project_name <> ".exs")

    end)

    pre_filtered_files
  end

end

defmodule FlatFiles do
  def list_all(file_path) do
    _list_all(file_path)
  end

  defp _list_all(file_path) do
    cond do
      String.contains?(file_path, ".git") -> []
      true -> expand(File.ls(file_path), file_path)
    end
  end

  defp expand({:ok, files}, path) do
    files
    |> Stream.flat_map(&_list_all("#{path}/#{&1}"))
  end

  defp expand({:error, _}, path) do
    [path]
  end
end


