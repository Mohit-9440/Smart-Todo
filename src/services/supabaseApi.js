import { supabase } from "../lib/supabase";
import { mapTaskFromDatabase } from "../utils/taskUtils";

class SupabaseTaskAPI {
  constructor() {
    this.tableName = "tasks";
  }

  // Retrieve a list of all tasks
  async getTasks() {
    try {
      const { data, error } = await supabase
        .from(this.tableName)
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        throw new Error(error.message);
      }

      // Map database format to API contract format
      const mappedData = (data || []).map(mapTaskFromDatabase);
      return { data: mappedData };
    } catch (error) {
      console.error("Error fetching tasks:", error);
      throw error;
    }
  }

  // Create a new task
  async createTask(taskData) {
    try {
      const newTask = {
        title: taskData.title,
        description: taskData.description || "",
        deadline: new Date(taskData.deadline).toISOString(), // Ensure proper ISO format
        is_completed: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      const { data, error } = await supabase
        .from(this.tableName)
        .insert([newTask])
        .select()
        .single();

      if (error) {
        throw new Error(error.message);
      }

      return { data: mapTaskFromDatabase(data) };
    } catch (error) {
      console.error("Error creating task:", error);
      throw error;
    }
  }

  // Update a task
  async updateTask(id, taskData) {
    try {
      const updateData = {
        updated_at: new Date().toISOString(),
      };

      if (taskData.title !== undefined) updateData.title = taskData.title;
      if (taskData.description !== undefined)
        updateData.description = taskData.description;
      if (taskData.deadline !== undefined) {
        updateData.deadline = new Date(taskData.deadline).toISOString(); // Ensure proper ISO format
      }
      if (taskData.hasOwnProperty("isCompleted")) {
        updateData.is_completed = taskData.isCompleted;
      }

      const { data, error } = await supabase
        .from(this.tableName)
        .update(updateData)
        .eq("id", id)
        .select()
        .single();

      if (error) {
        throw new Error(error.message);
      }

      return { data: mapTaskFromDatabase(data) };
    } catch (error) {
      console.error("Error updating task:", error);
      throw error;
    }
  }

  // Delete a task
  async deleteTask(id) {
    try {
      const { data, error } = await supabase
        .from(this.tableName)
        .delete()
        .eq("id", id)
        .select()
        .single();

      if (error) {
        throw new Error(error.message);
      }

      return { data: mapTaskFromDatabase(data) };
    } catch (error) {
      console.error("Error deleting task:", error);
      throw error;
    }
  }
}

export default SupabaseTaskAPI;
