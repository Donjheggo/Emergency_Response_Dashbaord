export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      emergency: {
        Row: {
          address: string
          created_at: string
          description: string | null
          id: string
          isRead: boolean
          responderId: string
          status: Database["public"]["Enums"]["emergency_status"]
          userId: string
        }
        Insert: {
          address: string
          created_at?: string
          description?: string | null
          id?: string
          isRead?: boolean
          responderId?: string
          status?: Database["public"]["Enums"]["emergency_status"]
          userId?: string
        }
        Update: {
          address?: string
          created_at?: string
          description?: string | null
          id?: string
          isRead?: boolean
          responderId?: string
          status?: Database["public"]["Enums"]["emergency_status"]
          userId?: string
        }
        Relationships: [
          {
            foreignKeyName: "emergency_reponderId_fkey"
            columns: ["responderId"]
            isOneToOne: false
            referencedRelation: "responder"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "emergency_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
        ]
      }
      responder: {
        Row: {
          created_at: string
          id: string
          mobile_number: string
          status: boolean
          type: string
        }
        Insert: {
          created_at?: string
          id?: string
          mobile_number: string
          status?: boolean
          type: string
        }
        Update: {
          created_at?: string
          id?: string
          mobile_number?: string
          status?: boolean
          type?: string
        }
        Relationships: []
      }
      user: {
        Row: {
          created_at: string
          email: string
          id: string
          name: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          name?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          name?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      emergency_status: "pending" | "responded" | "declined"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
